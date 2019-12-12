// habilitar dados offline
db.enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            // provavelmente multiplas abas abertas ao mesmo tempo
            console.log('Persistencia de dados falhou');
        } else if (err.code == 'unimplemented') {
            // browser nao suporta
            console.log('Persistencia nao disponivel');
        }
    });

// real-time listener que verifica as mudanças que ocorrem
db.collection('sobremesas').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            desenhaCard(change.doc.data(), change.doc.id);
        }
        if (change.type === 'removed') {
            // remover da pagina tambem
        }
    });
});

// adicionar nova sobremesa
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const sobregreys = {
        nome_personagem: form.sobregreysTitulo.value,
        desc: form.sobregreysDescricao.value,
        endereco_imagem: form.sobregreysArquivo.value
    };

    db.collection('sobremesas').add(sobregreys)
        .catch(err => console.log(err));

    //reseta o formulario
    form.sobregreysTitulo.value = '';
    form.sobregreysDescricao.value = '';
    form.sobregreysArquivo.value = '';

});