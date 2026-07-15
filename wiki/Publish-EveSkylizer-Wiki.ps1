#requires -Version 7.2

<#
.SYNOPSIS
    Publishes the Null Sec North eve-skylizer wiki package.

.DESCRIPTION
    Clones or updates the GitHub wiki repository, copies the approved Markdown
    pages from the extracted package, validates and commits the staged changes,
    and optionally pushes them.

    The script writes one consolidated log file and is intended to run directly
    from D:\Downloads\Eve-Skylizer-Wiki-v1.0.0.

.PARAMETER PackagePath
    Directory containing the wiki Markdown files.

.PARAMETER WikiRepositoryPath
    Local clone path for the GitHub wiki repository.

.PARAMETER RepositoryUrl
    Git URL for the GitHub wiki repository.

.PARAMETER MainRepositoryPath
    Main eve-skylizer repository. Its logs directory stores the consolidated log.

.PARAMETER Push
    Push the committed wiki change to GitHub.

.PARAMETER Force
    Allow replacement of package-managed wiki files when the local wiki clone
    has unrelated uncommitted changes. Review carefully before using.

.EXAMPLE
    .\Publish-EveSkylizer-Wiki.ps1 -Push
#>

[CmdletBinding(SupportsShouldProcess)]
param(
    [Parameter()]
    [ValidateNotNullOrEmpty()]
    [string]$PackagePath = 'D:\Downloads\Eve-Skylizer-Wiki-v1.0.0',

    [Parameter()]
    [ValidateNotNullOrEmpty()]
    [string]$WikiRepositoryPath = 'D:\Projects\EVE\eve-skylizer.wiki',

    [Parameter()]
    [ValidateNotNullOrEmpty()]
    [string]$RepositoryUrl = 'https://github.com/Null-Sec-North/eve-skylizer.wiki.git',

    [Parameter()]
    [ValidateNotNullOrEmpty()]
    [string]$MainRepositoryPath = 'D:\Projects\EVE\eve-skylizer',

    [Parameter()]
    [switch]$Push,

    [Parameter()]
    [switch]$Force
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$script:Version = '1.0.0'
$script:LogFile = $null

function Write-RunLog {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [ValidateSet('INFO', 'SUCCESS', 'WARNING', 'ERROR', 'DEBUG')]
        [string]$Level,

        [Parameter(Mandatory)]
        [string]$Message
    )

    $line = '[{0}] [{1}] {2}' -f (
        Get-Date -Format 'yyyy-MM-dd HH:mm:ss.fff'
    ), $Level, $Message

    switch ($Level) {
        'SUCCESS' { Write-Host $line -ForegroundColor Green }
        'WARNING' { Write-Warning $Message }
        'ERROR'   { Write-Host $line -ForegroundColor Red }
        'DEBUG'   { Write-Verbose $line }
        default   { Write-Host $line }
    }

    if (-not [string]::IsNullOrWhiteSpace($script:LogFile)) {
        Add-Content -LiteralPath $script:LogFile -Value $line -Encoding utf8
    }
}

function Invoke-Git {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string[]]$Arguments,

        [Parameter()]
        [string]$WorkingDirectory = $WikiRepositoryPath,

        [Parameter()]
        [switch]$AllowFailure
    )

    Write-RunLog -Level DEBUG -Message (
        'git {0} [cwd: {1}]' -f ($Arguments -join ' '), $WorkingDirectory
    )

    $output = & git -C $WorkingDirectory @Arguments 2>&1
    $exitCode = $LASTEXITCODE

    foreach ($line in @($output)) {
        Write-RunLog -Level INFO -Message ([string]$line)
    }

    if ($exitCode -ne 0 -and -not $AllowFailure) {
        throw "Git command failed with exit code $exitCode: git $($Arguments -join ' ')"
    }

    return [pscustomobject]@{
        ExitCode = $exitCode
        Output   = @($output)
    }
}

try {
    $mainRoot = [System.IO.Path]::GetFullPath($MainRepositoryPath)
    $packageRoot = [System.IO.Path]::GetFullPath($PackagePath)
    $wikiRoot = [System.IO.Path]::GetFullPath($WikiRepositoryPath)
    $logRoot = Join-Path $mainRoot 'logs'

    New-Item -ItemType Directory -Path $logRoot -Force | Out-Null

    $timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
    $script:LogFile = Join-Path $logRoot "Publish-EveSkylizer-Wiki-$timestamp.log"
    New-Item -ItemType File -Path $script:LogFile -Force | Out-Null

    Write-RunLog -Level INFO -Message "Publisher version: $script:Version"
    Write-RunLog -Level INFO -Message "Script path: $PSCommandPath"
    Write-RunLog -Level INFO -Message "Package path: $packageRoot"
    Write-RunLog -Level INFO -Message "Wiki repository path: $wikiRoot"
    Write-RunLog -Level INFO -Message "Wiki repository URL: $RepositoryUrl"
    Write-RunLog -Level INFO -Message "Push requested: $Push"

    if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
        throw 'Git is not available in PATH.'
    }

    if (-not (Test-Path -LiteralPath $packageRoot -PathType Container)) {
        throw "Package directory does not exist: $packageRoot"
    }

    $managedFiles = @(
        'Home.md',
        'Install.md',
        'Update-Application.md',
        'Update-Data.md',
        'Changelog.md',
        '_Sidebar.md',
        '_Footer.md'
    )

    foreach ($name in $managedFiles) {
        $source = Join-Path $packageRoot $name
        if (-not (Test-Path -LiteralPath $source -PathType Leaf)) {
            throw "Required wiki page is missing: $source"
        }
    }

    if (-not (Test-Path -LiteralPath (Join-Path $wikiRoot '.git'))) {
        if (Test-Path -LiteralPath $wikiRoot) {
            $existing = @(Get-ChildItem -LiteralPath $wikiRoot -Force)
            if ($existing.Count -gt 0) {
                throw "Wiki path exists but is not an empty Git repository: $wikiRoot"
            }
        }
        else {
            New-Item -ItemType Directory -Path (
                Split-Path -Parent $wikiRoot
            ) -Force | Out-Null
        }

        Write-RunLog -Level INFO -Message 'Cloning the GitHub wiki repository.'

        $cloneOutput = & git clone $RepositoryUrl $wikiRoot 2>&1
        $cloneExit = $LASTEXITCODE

        foreach ($line in @($cloneOutput)) {
            Write-RunLog -Level INFO -Message ([string]$line)
        }

        if ($cloneExit -ne 0) {
            throw @"
Unable to clone the wiki repository.

GitHub creates the separate .wiki.git repository only after an initial wiki page
has been saved. Enable Wikis in repository Settings, create the first Home page
in the GitHub web interface, and run this script again.
"@
        }
    }

    $status = Invoke-Git -Arguments @('status', '--porcelain')
    $uncommitted = @($status.Output | Where-Object {
        -not [string]::IsNullOrWhiteSpace([string]$_)
    })

    if ($uncommitted.Count -gt 0 -and -not $Force) {
        Write-RunLog -Level WARNING -Message 'Uncommitted wiki changes detected:'
        foreach ($line in $uncommitted) {
            Write-RunLog -Level WARNING -Message ([string]$line)
        }
        throw 'Refusing to overwrite an unclean wiki clone. Commit, stash, discard, or rerun with -Force after review.'
    }

    Invoke-Git -Arguments @('fetch', '--all', '--prune') | Out-Null

    $branchResult = Invoke-Git -Arguments @(
        'symbolic-ref',
        '--quiet',
        '--short',
        'HEAD'
    ) -AllowFailure

    if ($branchResult.ExitCode -eq 0) {
        Invoke-Git -Arguments @('pull', '--ff-only') -AllowFailure | Out-Null
    }

    foreach ($name in $managedFiles) {
        $source = Join-Path $packageRoot $name
        $destination = Join-Path $wikiRoot $name

        if ($PSCmdlet.ShouldProcess($destination, "Copy $name")) {
            Copy-Item -LiteralPath $source -Destination $destination -Force
            Write-RunLog -Level SUCCESS -Message "Updated wiki page: $name"
        }
    }

    $addArguments = @('add', '--') + $managedFiles
    Invoke-Git -Arguments $addArguments | Out-Null

    $check = Invoke-Git -Arguments @('diff', '--cached', '--check') -AllowFailure
    if ($check.ExitCode -ne 0) {
        throw 'The staged wiki patch failed Git whitespace validation.'
    }

    $staged = Invoke-Git -Arguments @(
        'diff',
        '--cached',
        '--name-status'
    )

    $stagedLines = @($staged.Output | Where-Object {
        -not [string]::IsNullOrWhiteSpace([string]$_)
    })

    if ($stagedLines.Count -eq 0) {
        Write-RunLog -Level SUCCESS -Message 'Wiki pages already match the package. No commit is required.'
        exit 0
    }

    Invoke-Git -Arguments @(
        'commit',
        '-m',
        'Create Null Sec North skŸlizer wiki documentation'
    ) | Out-Null

    $head = Invoke-Git -Arguments @(
        'show',
        '--stat',
        '--summary',
        '--format=fuller',
        'HEAD'
    )

    if ($Push) {
        Invoke-Git -Arguments @('push', 'origin', 'HEAD') | Out-Null
        Write-RunLog -Level SUCCESS -Message 'Wiki pages were pushed to GitHub.'
    }
    else {
        Write-RunLog -Level WARNING -Message 'Wiki pages were committed locally but were not pushed. Rerun with -Push or execute git push manually.'
    }

    $finalStatus = Invoke-Git -Arguments @('status', '--short')
    Write-RunLog -Level SUCCESS -Message "Run completed. Consolidated log: $script:LogFile"
}
catch {
    Write-RunLog -Level ERROR -Message $_.Exception.Message

    if ($_.ScriptStackTrace) {
        Write-RunLog -Level DEBUG -Message $_.ScriptStackTrace
    }

    Write-Host "`nConsolidated log: $script:LogFile"
    exit 1
}
