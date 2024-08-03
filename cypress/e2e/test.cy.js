describe('Comparar dois smartphones', () => {

    it('Teste', () => {
        //Aqui está visitando o site
        cy.visit('https://www.tudocelular.com/compare/')

        //Aqui está inserindo  o primeiro modelo de aparelho
        cy.get('#topsearch-text').type('xiaomi 14 ultra')
        cy.wait(1000)
        // Aqui está clicanco no botão Comparar (Adicionar)
        cy.contains('a', 'Comparar').click();
        cy.wait(1000)

        //Aqui está limpando a informação adicionada no filtro de busca
        cy.get('#topsearch-text').clear()

        //Aqui está inserindo o segundo modelo de aparelho 
        cy.get('#topsearch-text').type('apple iphone 15 pro max')
        cy.wait(1000)
        // Aqui está clicanco no botão Comparar (Adicionar)
        cy.contains('a', 'Comparar').click();
        cy.wait(1000)

        //Aqui está realizando a comparação dos aparelhos ao clicar no botão
        cy.get('.btn > span').click()

        // Aqui verificar se o comparativo é exibido 
        cy.get('#controles_titles').should('be.visible');

        // Aqui verificar se o nome do celular com o melhor custo-benefício é exibido
        cy.get('.row_titles > :nth-child(3) > :nth-child(1)').invoke('text').then((texto) => {
            const nomeCustoBeneficio = texto.trim()
            expect('Custo-benefício').to.equal(nomeCustoBeneficio)
        })

        // Aqui está armazenando o nome do primeiro celular para imprimir no log
        cy.get('a[class="compare_big_modelname"]').first().invoke('text').then((celular1) => {
            const nomeCelular01 = celular1.trim();

            // Aqui está armazenando o nome do segundo celular para imprimir no log
            cy.get('a[class="compare_big_modelname"]').eq(1).invoke('text').then((celular2) => {
                const nomeCelular02 = celular2.trim();

                // Aqui está armazenando os valores dos celulares para comparação
                cy.get('b').eq(0).invoke('text').then((valor1) => {
                    cy.get('b').eq(3).invoke('text').then((valor2) => {
                        // Convertendo os valores para números, se necessário
                        const num1 = parseFloat(valor1.replace(/[^0-9.-]+/g, '')); //Replace Remove caracteres não numéricos
                        const num2 = parseFloat(valor2.replace(/[^0-9.-]+/g, '')); //Replace Remove caracteres não numéricos

                        // Comparando os valores
                        if (num1 > num2) {
                            cy.log(`O valor ${num1} ${nomeCelular01} é maior que o valor ${num2} do ${nomeCelular02}.`);
                        } else if (num1 < num2) {
                            cy.log(`O valor ${num2} do ${nomeCelular02} é maior que o valor ${num1} ${nomeCelular01}.`);
                        } else {
                            cy.log(`Os valores ${num1} e ${num2} são iguais.`);
                        }
                    });
                });
            });
        });
    });
});