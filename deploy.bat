@echo off
title GitHub Portfolio Deployer - Syed Haider Ali Mahdi
color 0b
echo ================================================================
echo       SYED HAIDER ALI MAHDI - PORTFOLIO GITHUB DEPLOYER
echo ================================================================
echo.
echo Choose your deployment target:
echo [1] Push to existing 'potfilo' repo (https://github.com/syedhaiderali-0164/potfilo)
echo [2] Push to 'syedhaiderali-0164.github.io' (Recommended for custom username domain)
echo [3] Push to custom repository name
echo [4] Exit
echo.

set /p choice="Enter your choice (1, 2, 3 or 4): "

if "%choice%"=="1" (
    set REPO_URL=https://github.com/syedhaiderali-0164/potfilo.git
    goto deploy
)
if "%choice%"=="2" (
    set REPO_URL=https://github.com/syedhaiderali-0164/syedhaiderali-0164.github.io.git
    goto deploy
)
if "%choice%"=="3" (
    set /p REPO_NAME="Enter your repository name (e.g. portfolio): "
    set REPO_URL=https://github.com/syedhaiderali-0164/%REPO_NAME%.git
    goto deploy
)
if "%choice%"=="4" (
    echo Exiting...
    exit /b 0
)

:deploy
echo.
echo ----------------------------------------------------------------
echo Target Repository: %REPO_URL%
echo ----------------------------------------------------------------
echo [1/4] Preparing Git commits...
git add .
git commit -m "Update portfolio files" >nul 2>&1

echo [2/4] Setting main branch...
git branch -M main

echo [3/4] Configuring remote origin...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

echo [4/4] Pushing to GitHub (you may be asked to authenticate)...
git push -u origin main --force

if %errorlevel% equ 0 (
    echo.
    echo ================================================================
    echo [SUCCESS] Your portfolio was successfully uploaded to GitHub!
    echo ================================================================
    echo.
    echo Next Steps to view your live website:
    echo 1. Open your repository on GitHub.
    echo 2. Go to Settings -^> Pages.
    echo 3. Under 'Branch', select 'main' and '/ (root)', then click 'Save'.
    echo 4. Your site will be online in 1-2 minutes!
) else (
    echo.
    echo ================================================================
    echo [NOTICE] If push failed due to authentication, please log in
    echo via GitHub Credential Manager or enter your Personal Access Token.
    echo ================================================================
)

echo.
pause

