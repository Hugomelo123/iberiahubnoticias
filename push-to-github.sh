#!/bin/bash

# 🚀 Script para fazer push do IberiaHub Notícias para GitHub
# Autor: Hugo Melo
# Data: Janeiro 2026

echo "🚀 IberiaHub Notícias - Push para GitHub"
echo "=========================================="
echo ""

# Verificar se gh está instalado
if ! command -v gh &> /dev/null; then
    echo "📦 GitHub CLI não encontrado. A instalar..."
    echo ""
    
    # Instalar GitHub CLI
    type -p curl >/dev/null || (sudo apt update && sudo apt install curl -y)
    curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
    sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
    sudo apt update
    sudo apt install gh -y
    
    echo ""
    echo "✅ GitHub CLI instalado com sucesso!"
    echo ""
else
    echo "✅ GitHub CLI já instalado!"
    echo ""
fi

# Verificar se já está autenticado
if gh auth status &> /dev/null; then
    echo "✅ Já autenticado no GitHub!"
    echo ""
else
    echo "🔐 A iniciar autenticação..."
    echo ""
    echo "Instruções:"
    echo "1. Escolher: GitHub.com"
    echo "2. Escolher: HTTPS"
    echo "3. Escolher: Login with a web browser"
    echo "4. Copiar o código que aparecer"
    echo "5. Pressionar Enter (vai abrir browser)"
    echo "6. Colar o código no browser"
    echo ""
    
    gh auth login
fi

echo ""
echo "📁 A mudar para diretório do projeto..."
cd "/home/hugo/Secretária/IberiaHub-Noticias (5)/IberiaHub-Noticias"

echo ""
echo "📊 Status atual do Git:"
git status --short

echo ""
echo "🔍 Último commit:"
git log -1 --oneline

echo ""
echo "🚀 A fazer push para GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ✅ ✅ SUCESSO! ✅ ✅ ✅"
    echo ""
    echo "🎉 Projeto enviado para GitHub com sucesso!"
    echo ""
    echo "🌐 Ver repositório em:"
    echo "   https://github.com/Hugomelo123/iberiahubnoticias"
    echo ""
    echo "📚 Ficheiros enviados:"
    echo "   - README.md"
    echo "   - DOCUMENTACAO_COMPLETA.md"
    echo "   - CODIGOS_COMPLETOS.md"
    echo "   - GUIA_DEPLOY.md"
    echo "   - RELATORIO_TESTES.md"
    echo "   - 22 ficheiros no total"
    echo ""
    echo "🚀 Próximo passo: Deploy no Railway"
    echo "   Ver instruções em: GUIA_DEPLOY.md"
    echo ""
else
    echo ""
    echo "❌ Erro ao fazer push!"
    echo ""
    echo "Possíveis causas:"
    echo "1. Repositório não existe no GitHub"
    echo "2. Sem permissões de escrita"
    echo "3. Problemas de rede"
    echo ""
    echo "Criar repositório manualmente:"
    echo "1. Ir a: https://github.com/new"
    echo "2. Nome: iberiahubnoticias"
    echo "3. Deixar público ou privado"
    echo "4. NÃO adicionar README/License/gitignore"
    echo "5. Criar repositório"
    echo "6. Correr este script novamente"
fi
