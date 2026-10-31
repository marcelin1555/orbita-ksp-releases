# Órbita — site e distribuição

Site estático em português para download do Órbita KSP Launcher, hospedado na Vercel. Os executáveis ficam exclusivamente nos assets do GitHub Releases.

## Arquivos

- `index.html`, `style.css`, `app.js`: site sem framework e sem dependências de execução.
- `release.json`: versão, links, tamanhos e hashes dos três downloads.
- `assets/preview.png`: captura do aplicativo usando apenas instâncias fictícias.
- `vercel.json`: cabeçalhos de segurança e cache dos metadados.

Para prévia: `python -m http.server 48733 --bind 127.0.0.1`.
Para publicar: `vercel --prod` neste diretório, na equipe correta.

## Publicar uma versão

Primeiro gere e valide o portátil, instalador, ZIP e manifesto assinado no projeto do launcher. Publique-os em uma release GitHub. Atualize `release.json` com os tamanhos e hashes reais e os links versionados no HTML. Só publique o site depois de testar os links.

Esta pasta não contém o backend do aplicativo, instalações de KSP, saves, credenciais ou chaves privadas. O projeto é independente e não é afiliado aos responsáveis pelo KSP, Steam, Epic Games ou CKAN.
