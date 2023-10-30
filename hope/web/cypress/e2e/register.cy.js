import data from '../fixtures/orphanages.json'

describe('Cadastro de orfanatos', () => {

    it('deve cadastrar um novo orfanato', () => {
        const orphanage = data.create

        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })

        cy.gotoCreate()
        cy.createOrphanage(orphanage)
        cy.popupHaveText('Orfanato cadastrado com sucesso.')
    })

    it('não deve cadastrar orfanato quando o nome é duplicado', () => {
        const orphanage = data.duplicate

        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })
        cy.postOrphanage(orphanage)

        cy.gotoCreate()
        cy.createOrphanage(orphanage)
        cy.popupHaveText('Já existe um cadastro com o nome: ' + orphanage.name)
    })

    context('campos obrigatórios', () => {
        it('não deve cadastrar se o nome não for preenchido', () => {

            let orphanage = data.required
    
            delete orphanage.name
    
            cy.log(JSON.stringify(orphanage))
    
            cy.gotoCreate()
            cy.createOrphanage(orphanage)
            cy.alertHaveText('Nome', 'Campo obrigatório')
        })
    
        it('não deve cadastrar se sobre não for preenchido', () => {
    
            let orphanage = data.required
    
            delete orphanage.description
    
            cy.log(JSON.stringify(orphanage))
    
            cy.gotoCreate()
            cy.createOrphanage(orphanage)
            cy.alertHaveText('Sobre', 'Campo obrigatório')
        })
    
        it('não deve cadastrar não anexar a imagem', () => {
    
            let orphanage = data.required
    
            delete orphanage.image
    
            cy.log(JSON.stringify(orphanage))
    
            cy.gotoCreate()
            cy.createOrphanage(orphanage)
            cy.alertHaveText('Fotos', 'Envie pelo menos uma foto')
        })
    
        it('não deve cadastrar se o horário não for informado', () => {
    
            let orphanage = data.required
    
            delete orphanage.opening_hours
    
            cy.log(JSON.stringify(orphanage))
    
            cy.gotoCreate()
            cy.createOrphanage(orphanage)
            cy.alertHaveText('Horário', 'Campo obrigatório')
        })
    
        it('não deve cadastras os campos obrigatórios não forem preenchidos', () => {
    
            let orphanage = data.required
    
            delete orphanage.name
            delete orphanage.description
            delete orphanage.image
            delete orphanage.opening_hours
    
            cy.log(JSON.stringify(orphanage))
    
            cy.gotoCreate()
            cy.createOrphanage(orphanage)
    
            cy.alertHaveText('Nome', 'Campo obrigatório')
            cy.alertHaveText('Sobre', 'Campo obrigatório')
            cy.alertHaveText('Fotos', 'Envie pelo menos uma foto')
            cy.alertHaveText('Horário', 'Campo obrigatório')
        })
    })
})

