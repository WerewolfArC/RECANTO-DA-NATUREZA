class Hospedagens {
    constructor() {}
    hospedagemId() { //pronto
        localStorage.setItem('hospedagemId', localStorage.getItem('hospedagemId')?Number(localStorage.getItem('hospedagemId'))+1:0);
        return Number(localStorage.getItem('hospedagemId'));
    };
    allhospedagens() { //pronto
        if (localStorage.getItem('hospedagens')) {
            return JSON.parse(localStorage.getItem('hospedagens'));
        } else {
            console.log('hospedagens null');
            return { error: 'hospedagens null' };
        };
    };
    findhospedagemById(id) { //pronto
        id = Number(id);
        if (localStorage.getItem('hospedagens')) {
            let value;
            JSON.parse(localStorage.getItem('hospedagens')).forEach((item, index) => {
                if (item.id === id) {
                    value = {data: item, index};
                };
            });
            return value;
        } else {
            console.log('hospedagens null');
            return { error: 'hospedagens null' };
        };
    };
    createhospedagem(name, description, unitValue) { //pronto
        try {
            const hospedagemId = this.hospedagemId();
            const hospedagem = {id: hospedagemId, name, description, unitValue: Number(unitValue), createdAt: new Date().toLocaleString("pt-BR"), updatedAt: null};
            if (localStorage.getItem('hospedagens')) {
                let hospedagens = JSON.parse(localStorage.getItem('hospedagens'));
                hospedagens.push(hospedagem);
                localStorage.setItem('hospedagens', JSON.stringify(hospedagens));
            } else {
                localStorage.setItem('hospedagens', JSON.stringify([hospedagem]));
            };
            return localStorage.getItem('hospedagens');
        } catch (e) {
            localStorage.setItem('hospedagemId', localStorage.getItem('hospedagemId')?Number(localStorage.getItem('hospedagemId'))-1:0);
            console.log('error:' + e);
            return { error: e };
        };
    };
    updatehospedagem(id, data) { //pronto
        try {
            const hospedagem = this.findhospedagemById(id);
            if (hospedagem.data) {
                if (data.name) hospedagem.data.name = data.name;
                if (data.description) hospedagem.data.description = data.description;
                if (data.unitValue) hospedagem.data.unitValue = Number(data.unitValue);
                hospedagem.data.updatedAt = new Date().toLocaleString("pt-BR");
                let hospedagens = JSON.parse(localStorage.getItem('hospedagens'));
                hospedagens.splice(hospedagem.index, 1, hospedagem.data);
                localStorage.setItem('hospedagens', JSON.stringify(hospedagens));
            }
        } catch (e) {
            //localStorage.setItem('hospedagemId', localStorage.getItem('hospedagemId')?Number(localStorage.getItem('hospedagemId'))-1:0);
            console.log('error:' + e);
            return { error: e };
        };
    };
    deletehospedagem(id) {
        try {
            const hospedagem = this.findhospedagemById(id);
            var hospedagens = JSON.parse(localStorage.getItem('hospedagens'))
            hospedagens.splice(hospedagem.index, 1);
            localStorage.setItem('hospedagens', JSON.stringify(hospedagens));
        } catch (e) {
            // localStorage.setItem('hospedagemId', localStorage.getItem('hospedagemId')?Number(localStorage.getItem('hospedagemId'))-1:0);
            console.log('error: ' + e);
            return { error: e };
        }
    }
};

// class metaChar {
//     metaDescription = '';
//     metaKeys = [];
//     constructor() {
//         if (!localStorage.getItem('metaDescription') || localStorage.getItem('metaDescription') === '') localStorage.setItem('metaDescription', this.metaDescription);
//         if (!localStorage.getItem('metaKeys') || localStorage.getItem('metaKeys') === '') localStorage.setItem('metaKeys', this.metaKeys);
//         this.metaDescription = localStorage.getItem('metaDescription');
//         this.metaKeys = localStorage.getItem('metaKeys');
//     }
//     getKeys() {
//         return this.metaKeys;
//     };

//     addKey(key) {
//         console.log(this.metaKeys)
//         this.metaKeys.push(key);
//         localStorage.setItem('metaKeys', this.metaKeys);
//     };

//     deleteKey(key) {
//         this.metaKeys = this.metaKeys.filter(e => e !== key);
//         localStorage.setItem('metaKeys', this.metaKeys);
//     }

//     getDescription() {
//         return this.metaDescription;
//     }

//     updateDescription(description) {
//         if (description.split('').length > 150) return {error: 'limit max characters ecceded'}
//         this.metaDescription = description
//         localStorage.setItem('metaDescription', this.metaDescription);
//     }
// };