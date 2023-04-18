import Api from '~/services'
/**
 * 
 */

const state = {
    categories: [{
            id: 1,
            name: '',
            icon: 'res://eskeleton_circle'
        },
        {
            id: 2,
            name: '',
            icon: 'res://eskeleton_circle'
        },
        {
            id: 3,
            name: '',
            icon: 'res://eskeleton_circle'
        },
        {
            id: 4,
            name: '',
            icon: 'res://eskeleton_circle'
        },
        {
            id: 5,
            name: '',
            icon: 'res://eskeleton_circle'
        },
        {
            id: 6,
            name: '',
            icon: 'res://eskeleton_circle'
        },
        {
            id: 7,
            name: '',
            icon: 'res://eskeleton_circle'
        },
    ],
    categoriesBase: [{

            id: 1,
            name: 'Mujer',
            key: 'woman',
            icon: 'res://woman',
            color: "",
            colSpan: 3,
            col: 0,
            row: 0,
            left: 100,
        },
        {
            id: 3,
            name: 'Hombre',
            key: 'man',
            icon: 'res://men',
            color: "",
            colSpan: 3,
            col: 3,
            row: 0,
            left: 100,
        },
        {
            id: 6,
            name: 'Talle especial',
            key: 'xl',
            icon: 'res://label',
            color: "",
            colSpan: 2,
            col: 0,
            row: 1,
            left: 35,
            top: 20
        },
        {
            id: 4,
            name: 'Niños',
            key: 'kids',
            icon: 'res://baby',
            color: "",
            colSpan: 2,
            col: 2,
            row: 1,
            left: 35,
            top: 20
        },
        {
            id: 2,
            name: 'Accesorios',
            key: 'accessories',
            icon: 'res://accessories',
            color: "",
            colSpan: 2,
            col: 4,
            row: 1,
            left: 35,
            top: 20
        },
    ],
    orderedCategories: [],
    isLoadCategories: false,
    categorieActive: 1,
    subCategorieActive: null,
    subcategoriesActives: [],
    openFilter: false
};

const getters = {
    subcategories(state) {
        let subs = []
        if (state.categorieActive == 0) {
            if (state.categories.length > 7) {
                state.categories.forEach((element) => {
                    subs = subs.concat(subs, element.subcategories)
                })
            }
            return subs
        }
        return state.categories.find((element) => element.id == state.categorieActive).subcategories
    },
    categorieActiveGetters(state) {
        if (state.categoriesBase == 0) {
            return null
        }
        return state.categoriesBase.find((e) => e.id == state.categorieActive)
    },
    computedCategories(state) {
        let todo = []
        todo.push.apply(todo, state.categories)
        let url = '~/assets/icons/'
        let orden = []
        let otros = []
        todo.map((element) => {

            if (element.name == 'Mujer') {
                element.icon = `${url}mujer.png`
                element.color = "#BA68C8"
                orden.push(element)
            } else if (element.name == 'Hombre') {
                element.icon = `${url}hombre.png`
                element.color = "#9FA8DA"
                orden.push(element)
            } else if (element.name == 'Talle Especial') {
                element.icon = `${url}talles.png`
                element.color = "#80CBC4"
                orden.push(element)
            } else if (element.name == 'Ninos') {
                element.icon = `${url}ninos.png`
                element.color = "#81D4FA"
                orden.push(element)
            } else if (element.name == 'Accesorios') {
                element.icon = `${url}accesorios.png`
                element.color = "#FFE082"
                otros.push(element)
            } else if (element.name == 'Ropa Deportiva') {
                element.icon = `${url}ropa_deportiva.png`
                element.color = "#FFAB91"
                otros.push(element)
            } else {
                element.icon = `res://eskeleton_circle`
                otros.push(element)
            }

        })
        orden.push.apply(orden, otros)
        return orden
    },
};

const mutations = {
    setCategories(state, val) {
        state.categories = val
        state.isLoadCategories = true
    },
    setOrderedCategories(state, val) {
        state.orderedCategories = val
    },
    setCategorieActive(state, val) {
        state.categorieActive = val
    },
    setSubcategoriesActive(state, val) {
        // console.log(val)
        state.subCategorieActive = val
    },
    changeCategorieBase(state, val) {
        state.categoriesBase.find((e) => e.id == val.id)[val.prop] = val.value
    }
};

const actions = {
    async getCategories(context) {
        const response = await Api.get('categories')
        return response
    },
    async StorePreferences(context, categories) {
        await Api.post('preferences', categories).then((response) => {
            return response
        })
    }
};

export const categories = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};