/// <reference types="Cypress" />

const ARQUIVOS = [ 
    'ex.gif',
    'ex.php',
    'ex.png',
    'ex.xls'
];

const ARQUIVOS_COM_ENCONDING = [
    {
    fileName: 'ex.xls',
    encoding: 'utf8'
    }
]


context('Upload', () => {
    beforeEach(() => {
        cy.visit('https://dsheiko.github.io/react-html5-form/');
    });
    
    ARQUIVOS.forEach(arquivo =>{
    it(`deve aceitar arquivos no formato ${arquivo.split('.')[1]}`, () => {
        const fileInputElement = '#fileInput';
        cy.get(fileInputElement).attachFile(arquivo);

    })

    });

    ARQUIVOS_COM_ENCONDING.forEach(arquivo => {
        it(`deve aceitar arquivos no formato ${arquivo.fileName.split('.')[1]} com encoding ${arquivo.encoding}`, () => {
            const fileInputElement = '#fileInput';
            cy.get(fileInputElement).attachFile({
                filePath: arquivo.fileName,
                encoding: arquivo.encoding
            });
    
        })
    })

    it('Deve aceitar mais de arquivo por vez', () => {
        const fileInputElement = '#fileInput';
        cy.get(fileInputElement)
        .attachFile(ARQUIVOS[0])
        .attachFile(ARQUIVOS[1])
        .attachFile(ARQUIVOS[2])
    });
});
