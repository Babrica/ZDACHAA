let eventBus = new Vue()    //требования: дизайн - эстетичен и понятен для пользователя

Vue.component('cards-kanban', {
    template:`
    <div>
        <fill></fill>
        <div id="columns">
            <column1 :column1="column1"></column1>
            <column2 :column2="column2"></column2>
            <column3 :column3="column3"></column3>
            <column4 :column4="column4"></column4>
        </div>
    </div>
    `,
    data() {
        return {
            column1:[],
            column2:[],
            column3:[],
            column4:[],
            updateCard: false
        }
    },
    methods:{

    },
    mounted() {
        eventBus.$on('card-create', card => {
            this.column1.push(card)
        })
    }
})

Vue.component('fill', {     //содержит:дата создания, заголовок, описание задачи, дедлайн
    props:{

    },
    template:`
    <div>
        <h3>Заполните карточку задачи</h3>
        <form @submit.prevent="onSubmit">
            <p>Введите заголовок: 
                <input type="text" v-model="title" maxlength="30" placeholder="Заголовок">
            </p>
            <p>Добавьте описание задаче: 
                <textarea v-model="description" cols="20" rows="5"></textarea>
            </p>
            <p>Укажите дату дедлайна: 
                <input type="date" v-model="dateD">
            </p>
            <p>
                <input type="submit" value="Добвить задачу">
            </p>
        </form>
    </div>
    `,
    data(){
        return {
            title: null,
            description: null,
            dateD: null,
        }
    },
    methods: {
        onSubmit() {
            let card = {
                title: this.title,
                description: this.description,
                dateD: this.dateD,                  //дата дедлайна
                dateC: new Date().toLocaleString(),   //дата создания
                dateL: null,                            //дата последних изменений
                dateE: null,                            //дата выполнения
                inTime: true                            //в срок или нет
            }
            eventBus.$emit('card-create', card)
            this.title = null
            this.description = null
            this.dateD = null
            console.log(card)
        },
    }
})

Vue.component('column1', {  //создание, удаление, редактирование карточки, время последнего редактирования
    props:{                 // перемещение карточки во второй столбец
        card: {
            type: Object,
            required: true
        },
        column1: {
            type: Array,
            required: true
        },
        updateCard:{
            type:Boolean,
            required: true
        }
    },
    template:`
    <div class="column">
        <h3>Запланированные задачи</h3>
        <div v-for="card in column1">
            <ul>
                <li><b>Заголовок:</b> {{ card.title }}</li>
                <li><b>Описание задачи:</b> {{ card.description }}</li>
                <li><b>Дата дедлайна:</b> {{ card.dateD }}</li>
                <li><b>Дата создания:</b> {{ card.dateC }}</li>
                <li v-if="card.dateL"><b>Дата последних изменений</b>{{ card.dateL }}</li>
            </ul>
            <button @click="deleteCard(card)">Удалить</button>
            <button @click="updateC">Изменить</button>
            <div v-if="updateCard">
                <form @submit.prevent="updateTask(card)">
                    <p>Введите заголовок: 
                        <input type="text" v-model="card.title" maxlength="30" placeholder="Заголовок">
                    </p>
                    <p>Добавьте описание задаче: 
                        <textarea v-model="card.description" cols="20" rows="5"></textarea>
                    </p>
                    <p>Укажите дату дедлайна: 
                        <input type="date" v-model="card.dateD">
                    </p>
                    <p>
                        <input type="submit" value="Изменить карточку">
                    </p>
                </form>
            </div>
        </div>
    </div>
    `,
    methods: {
        deleteCard(card){
            this.column1.splice(this.column1.indexOf(card), 1)
        },
        updateC(){
            this.updateCard = true
            console.log(this.updateCard)
        },
        updateTask(card){
            this.column1.push(card)
            this.column1.splice(this.column1.indexOf(card), 1)
        }
    },
})

Vue.component('column2', {  //редактирование, время последнего редактирования, перемещение в третий столб
    props:{

    },
    template:`
    <div class="column">
        <h3>Задачи в работе</h3>
    </div>
    `,
    methods: {

    },
})

Vue.component('column3', {  //редактирование, время последнего редактирования
    props:{                 //перемещение в 4 столб, перемещение во 2 столб + причина возврата

    },
    template:`
    <div class="column">
        <h3>Тестирование</h3>
    </div>
    `,
    methods: {

    },
})

Vue.component('column4', {  //проверка срока дедлайна: срок не выполнен - просроченная,
    props:{                 //срок выполнен - выполненная в срок

    },
    template:`
    <div class="column">
        <h3>Выполненные задачи</h3>
    </div>
    `,
    methods: {

    },
})

let app = new Vue({
    el:'#app',
    data:{

    }
})