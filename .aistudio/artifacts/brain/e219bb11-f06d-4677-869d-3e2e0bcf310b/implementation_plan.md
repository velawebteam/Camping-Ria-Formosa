# Plano de Implementação: Redesign do Website Camping Ria Formosa

## 1. Visão Geral
Redesign completo do website do Camping Ria Formosa (Cabanas de Tavira, Algarve) com foco em: experiência *mobile-first*, reservas diretas, apresentação *premium* dos alojamentos e otimização para motores de pesquisa (SEO/AEO/GEO).

## 2. Stack Tecnológica
- **Frontend**: React, TypeScript, Vite, Tailwind CSS (estilo *premium*, minimalista).
- **Backend/Base de Dados**: Firebase (Firestore para dados, Auth para administração).
- **SEO/Metadata**: Conformidade com Schema.org e práticas avançadas de meta-tags.
- **Performance**: Imagens otimizadas (WebP/AVIF), *lazy loading*.

## 3. Arquitetura do Website
### Páginas Principais
1.  **Homepage**: Hero com motor de pesquisa, Apresentação, Destaque de Alojamentos, Instalações, Localização, Galeria, Avaliações, CTA.
2.  **Alojamentos**: Visão geral de todas as modalidades.
3.  **Bungalows**: Detalhe comercial (Classe A/B, Tarifários, Regras).
4.  **Campismo**: Detalhe técnico e comercial, Calculadora de Preços.
5.  **Instalações**: Apresentação visual detalhada.
6.  **Localização**: Mapa, envolvente regional.

## 4. Sistema de Reservas
- **Fluxo**: 4 Etapas (Pesquisa, Disponibilidade, Dados, Confirmação/Pagamento).
- **Modo Demonstrativo**: Integração preparada para API externa (pendente de fornecedor real).
- **Administração**: Área protegida para gestão de reservas, preços, disponibilidade e conteúdos.

## 5. Fases de Desenvolvimento
1.  **Estrutura Base & Design System**: Setup de cores, tipografia e layout base (Header/Footer, Responsividade).
2.  **Homepage e Páginas Estáticas**: Implementação de todos os componentes da página inicial e páginas de informação (Instalações, Localização).
3.  **Desenvolvimento do Sistema de Reservas**: Criação da lógica *frontend*, formulários e fluxo de reserva.
4.  **Integração Firebase**: Configuração da estrutura de base de dados para tarifários, disponibilidade e gestão de pedidos.
5.  **Otimização SEO & Performance**: Aplicação de *schema markup*, meta-tags e otimização de imagens.
6.  **Administração & Testes**: Criação da área administrativa e testes de fluxo.

## 6. Próximos Passos (Ação Imediata)
1.  Configurar Firebase e autenticação para o sistema.
2.  Implementar o design system baseado na paleta de cores e tipografia (Playfair Display/Inter).
3.  Desenvolver os componentes base (Header, Footer, Barra de Reserva Móvel).

---
*Este plano serve de base e será executado de forma iterativa.*
