#!/bin/bash

# Security Check Script for Nova Syn
# Run this before deploying to production

echo "🔒 Nova Syn - Security Check"
echo "=============================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Check 1: Environment variables
echo "📋 Checking environment variables..."
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env file not found${NC}"
    ERRORS=$((ERRORS+1))
else
    echo -e "${GREEN}✅ .env file exists${NC}"
    
    # Check required variables
    required_vars=("VITE_BREVO_API_KEY" "VITE_RECIPIENT_EMAIL" "VITE_SENDER_EMAIL")
    for var in "${required_vars[@]}"; do
        if ! grep -q "^$var=" .env 2>/dev/null; then
            echo -e "${YELLOW}⚠️  Missing: $var${NC}"
            WARNINGS=$((WARNINGS+1))
        fi
    done
fi
echo ""

# Check 2: Dependencies
echo "🔍 Checking for vulnerabilities in dependencies..."
if command -v npm &> /dev/null; then
    npm audit --audit-level=high
    if [ $? -ne 0 ]; then
        echo -e "${YELLOW}⚠️  Vulnerabilities found in dependencies${NC}"
        WARNINGS=$((WARNINGS+1))
    else
        echo -e "${GREEN}✅ No high-severity vulnerabilities${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  npm not found, skipping audit${NC}"
    WARNINGS=$((WARNINGS+1))
fi
echo ""

# Check 3: Security files
echo "📁 Checking security files..."
security_files=("nginx.conf" "Dockerfile" ".dockerignore" "SECURITY.md")
for file in "${security_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file exists${NC}"
    else
        echo -e "${RED}❌ $file missing${NC}"
        ERRORS=$((ERRORS+1))
    fi
done
echo ""

# Check 4: Sensitive data in git
echo "🔐 Checking for sensitive data..."
if git rev-parse --git-dir > /dev/null 2>&1; then
    # Check if .env is tracked
    if git ls-files --error-unmatch .env &> /dev/null; then
        echo -e "${RED}❌ .env file is tracked by git!${NC}"
        ERRORS=$((ERRORS+1))
    else
        echo -e "${GREEN}✅ .env not tracked by git${NC}"
    fi
    
    # Check for API keys in code
    if git grep -i "api[_-]key" -- '*.ts' '*.tsx' '*.js' '*.jsx' | grep -v "VITE_" | grep -v "import.meta.env" &> /dev/null; then
        echo -e "${YELLOW}⚠️  Potential hardcoded API keys found${NC}"
        WARNINGS=$((WARNINGS+1))
    else
        echo -e "${GREEN}✅ No hardcoded API keys detected${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Not a git repository${NC}"
fi
echo ""

# Check 5: Build test
echo "🏗️  Testing build..."
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Build successful${NC}"
    
    # Check build size
    if [ -d "dist" ]; then
        size=$(du -sh dist | cut -f1)
        echo "   Build size: $size"
    fi
else
    echo -e "${RED}❌ Build failed${NC}"
    ERRORS=$((ERRORS+1))
fi
echo ""

# Check 6: TypeScript errors
echo "📝 Checking TypeScript..."
if npm run build:check > /dev/null 2>&1; then
    echo -e "${GREEN}✅ No TypeScript errors${NC}"
else
    echo -e "${YELLOW}⚠️  TypeScript errors found${NC}"
    WARNINGS=$((WARNINGS+1))
fi
echo ""

# Check 7: Security headers
echo "🛡️  Checking security headers configuration..."
if grep -q "X-Frame-Options" nginx.conf && \
   grep -q "Content-Security-Policy" nginx.conf && \
   grep -q "Strict-Transport-Security" nginx.conf; then
    echo -e "${GREEN}✅ Security headers configured${NC}"
else
    echo -e "${YELLOW}⚠️  Some security headers missing in nginx.conf${NC}"
    WARNINGS=$((WARNINGS+1))
fi
echo ""

# Check 8: Rate limiting
echo "⏱️  Checking rate limiting..."
if grep -q "limit_req_zone" nginx.conf; then
    echo -e "${GREEN}✅ Rate limiting configured${NC}"
else
    echo -e "${YELLOW}⚠️  Rate limiting not configured in nginx.conf${NC}"
    WARNINGS=$((WARNINGS+1))
fi
echo ""

# Summary
echo "=============================="
echo "📊 Security Check Summary"
echo "=============================="
echo -e "Errors: ${RED}$ERRORS${NC}"
echo -e "Warnings: ${YELLOW}$WARNINGS${NC}"
echo ""

if [ $ERRORS -gt 0 ]; then
    echo -e "${RED}❌ Security check FAILED!${NC}"
    echo "Please fix the errors before deploying."
    exit 1
elif [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Security check completed with warnings${NC}"
    echo "Review warnings before deploying."
    exit 0
else
    echo -e "${GREEN}✅ Security check PASSED!${NC}"
    echo "Ready for deployment."
    exit 0
fi
