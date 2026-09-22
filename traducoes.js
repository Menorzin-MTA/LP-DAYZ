// ============================================
// SISTEMA DE TRADUÇÃO - LAST POINT
// ============================================

const traducoes = {
    // ==========================================
    // IDIOMAS DISPONÍVEIS
    // ==========================================

    idiomas: {
        pt: 'Português',
        en: 'English'
    },


    // ==========================================
    // NAVBAR
    // ==========================================

    navbar: {
        pt: {
            inicio: 'Início',
            loja: 'Loja',
            regras: 'Regras',
            ajuda: 'Ajuda',
            discord: 'Discord',
            login: 'Login'
        },
        en: {
            inicio: 'Home',
            loja: 'Store',
            regras: 'Rules',
            ajuda: 'Help',
            discord: 'Discord',
            login: 'Login'
        }
    },


    // ==========================================
    // PÁGINA INICIAL
    // ==========================================

    index: {
        pt: {
            titulo: 'LAST POINT',
            subtitulo: 'Sobreviva. Construa. Conquiste.',
            descricao: 'O apocalipse zumbi mais realista do MTA.',
            bemVindo: 'Bem-vindo ao',
            jogar: 'Jogar Agora',
            verRegras: 'Ver Regras',
            jogadores: 'Jogadores',
            servidorAtivo: 'Servidor Ativo',
            avaliacoes: 'Avaliações',
            diferenciais: {
                antiCheat: 'Anti-Cheat',
                antiCheatDesc: 'Sistema avançado de proteção contra hackers e cheats.',
                equipe: 'Equipe Dedicada',
                equipeDesc: 'Administradores ativos 24 horas para garantir sua diversão.',
                conteudo: 'Conteúdo Exclusivo',
                conteudoDesc: 'Itens, eventos e sistemas únicos que você só encontra aqui.',
                comunidade: 'Comunidade Ativa',
                comunidadeDesc: 'Milhares de jogadores online para interagir e se divertir.'
            },
            comoJogar: {
                titulo: 'Como Jogar no',
                destaque: 'Last Point',
                passo1: 'Baixe o MTA',
                passo1Desc: 'Multi Theft Auto é o cliente necessário para jogar.',
                passo2: 'Conecte-se',
                passo2Desc: 'Use o IP do servidor e entre no mundo de Last Point.',
                passo3: 'Sobreviva',
                passo3Desc: 'Explore, construa e lute para sobreviver ao apocalipse.',
                ipServidor: 'IP do Servidor:'
            },
            rodape: 'Todos os direitos reservados.'
        },
        en: {
            titulo: 'LAST POINT',
            subtitulo: 'Survive. Build. Conquer.',
            descricao: 'The most realistic zombie apocalypse in MTA.',
            bemVindo: 'Welcome to',
            jogar: 'Play Now',
            verRegras: 'View Rules',
            jogadores: 'Players',
            servidorAtivo: '24/7 Server',
            avaliacoes: 'Reviews',
            diferenciais: {
                antiCheat: 'Anti-Cheat',
                antiCheatDesc: 'Advanced protection system against hackers and cheats.',
                equipe: 'Dedicated Team',
                equipeDesc: 'Admins active 24/7 to ensure your fun.',
                conteudo: 'Exclusive Content',
                conteudoDesc: 'Unique items, events and systems you only find here.',
                comunidade: 'Active Community',
                comunidadeDesc: 'Thousands of players online to interact and have fun.'
            },
            comoJogar: {
                titulo: 'How to Play on',
                destaque: 'Last Point',
                passo1: 'Download MTA',
                passo1Desc: 'Multi Theft Auto is the client needed to play.',
                passo2: 'Connect',
                passo2Desc: 'Use the server IP and enter the world of Last Point.',
                passo3: 'Survive',
                passo3Desc: 'Explore, build and fight to survive the apocalypse.',
                ipServidor: 'Server IP:'
            },
            rodape: 'All rights reserved.'
        }
    },


    // ==========================================
    // PÁGINA DA LOJA
    // ==========================================

    loja: {
        pt: {
            titulo: 'Loja',
            subtitulo: 'Adquira benefícios exclusivos para sua jornada no mundo de Last Point.',
            produtos: {
                kit: {
                    nome: 'Kit Sobrevivente',
                    descricao: 'Equipamentos básicos para começar sua jornada em Last Point.',
                    preco: 'R$ 19,90'
                },
                vip: {
                    nome: 'VIP Survivor',
                    descricao: 'Benefícios exclusivos e vantagens dentro do servidor.',
                    preco: 'R$ 39,90',
                    badge: 'Mais Vendido'
                },
                elite: {
                    nome: 'VIP Elite',
                    descricao: 'O pacote definitivo para quem quer dominar Last Point.',
                    preco: 'R$ 69,90'
                },
                coins: {
                    nome: '1.000 Last Coins',
                    descricao: 'Moedas virtuais para utilizar na loja do servidor.',
                    preco: 'R$ 10,00'
                }
            },
            comprar: 'Comprar'
        },
        en: {
            titulo: 'Store',
            subtitulo: 'Get exclusive benefits for your journey in the world of Last Point.',
            produtos: {
                kit: {
                    nome: 'Survivor Kit',
                    descricao: 'Basic equipment to start your journey in Last Point.',
                    preco: '$3.99'
                },
                vip: {
                    nome: 'VIP Survivor',
                    descricao: 'Exclusive benefits and advantages within the server.',
                    preco: '$7.99',
                    badge: 'Best Seller'
                },
                elite: {
                    nome: 'VIP Elite',
                    descricao: 'The ultimate package for those who want to dominate Last Point.',
                    preco: '$13.99'
                },
                coins: {
                    nome: '1,000 Last Coins',
                    descricao: 'Virtual coins to use in the server store.',
                    preco: '$2.00'
                }
            },
            comprar: 'Buy'
        }
    },


// ==========================================
    // PÁGINA DE REGRAS
    // ==========================================

    regras: {
        pt: {
            titulo: 'Regras',
            subtitulo: 'Conheça as regras do servidor e mantenha uma boa experiência para todos os jogadores.',
            r1_titulo: 'Respeito aos jogadores',
            r1_desc: 'Respeite todos os jogadores e membros da equipe. Ofensas, preconceito, discriminação e perseguição não serão tolerados.',
            r2_titulo: 'Proibido Deathmatch',
            r2_desc: 'Não mate outros jogadores sem uma justificativa válida dentro do contexto do servidor. Toda ação deve possuir uma motivação coerente.',
            r3_titulo: 'Anti-RDM',
            r3_desc: 'É proibido atacar ou eliminar jogadores aleatoriamente sem qualquer interação ou motivo válido.',
            r4_titulo: 'Uso de veículos',
            r4_desc: 'Utilize os veículos de forma coerente. Não utilize veículos para atropelar jogadores propositalmente ou obter vantagens injustas.',
            r5_titulo: 'Exploração de bugs',
            r5_desc: 'É proibido utilizar bugs, falhas ou exploits para obter vantagens dentro do servidor. Bugs encontrados devem ser comunicados à administração.',
            r6_titulo: 'Cheats e programas externos',
            r6_desc: 'Qualquer tipo de cheat, hack, script ou programa que ofereça vantagem injusta é estritamente proibido.',
            r7_titulo: 'Uso do chat e voz',
            r7_desc: 'Utilize os canais de comunicação corretamente. Evite spam, flood, divulgação não autorizada e conteúdo ofensivo.',
            r8_titulo: 'Respeite a administração',
            r8_desc: 'As decisões da equipe devem ser respeitadas. Caso discorde de alguma decisão, procure a administração pelos canais oficiais.',
            atencao: {
                titulo: 'Atenção',
                descricao: 'O desconhecimento das regras não isenta o jogador de punições. As regras podem ser atualizadas a qualquer momento pela administração.'
            }
        },
        en: {
            titulo: 'Rules',
            subtitulo: 'Know the server rules and maintain a good experience for all players.',
            r1_titulo: 'Respect for players',
            r1_desc: 'Respect all players and staff members. Offenses, prejudice, discrimination, and harassment will not be tolerated.',
            r2_titulo: 'No Deathmatch',
            r2_desc: 'Do not kill other players without a valid justification within the context of the server. Every action must have a coherent motivation.',
            r3_titulo: 'Anti-RDM',
            r3_desc: 'It is forbidden to randomly attack or eliminate players without any interaction or valid reason.',
            r4_titulo: 'Vehicle usage',
            r4_desc: 'Use vehicles coherently. Do not use vehicles to intentionally run over players or gain unfair advantages.',
            r5_titulo: 'Bug exploitation',
            r5_desc: 'It is forbidden to use bugs, glitches, or exploits to gain advantages within the server. Any bugs found must be reported to the administration.',
            r6_titulo: 'Cheats and external programs',
            r6_desc: 'Any type of cheat, hack, script, or program that provides an unfair advantage is strictly prohibited.',
            r7_titulo: 'Chat and voice usage',
            r7_desc: 'Use communication channels properly. Avoid spam, flood, unauthorized advertising, and offensive content.',
            r8_titulo: 'Respect the administration',
            r8_desc: 'Staff decisions must be respected. If you disagree with a decision, contact the administration through official channels.',
            atencao: {
                titulo: 'Attention',
                descricao: 'Lack of knowledge of the rules does not exempt the player from punishments. Rules may be updated at any time by the administration.'
            }
        }
    },


    // ==========================================
    // PÁGINA DE AJUDA
    // ==========================================

    ajuda: {
        pt: {
            titulo: 'Painel de Ajuda',
            subtitulo: 'Tire suas dúvidas e aprenda tudo sobre o mundo de Last Point.'
        },
        en: {
            titulo: 'Help Panel',
            subtitulo: 'Get your questions answered and learn everything about the world of Last Point.'
        }
    }
};

// Verifica se o objeto foi carregado corretamente
console.log('✅ Traduções carregadas:', Object.keys(traducoes));