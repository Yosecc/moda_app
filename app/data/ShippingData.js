
export const envios =  [
	{
		name: "Envíos a domicilio",
		direcciones:[
			{
				name: "CABA",
				transportes:[{
					name: 'Moto',
					image:'~/assets/moto.png',
					precio: 480,
					oferta: 380,
					comentarios: 'CABA | EN 2 DIAS EN CASA'
				}]
			},
			{
				name: "GBA",
				transportes:[
					{
						name: 'Moto',
						image: '~/assets/moto.png',
						precio: 480,
						oferta: null,
						comentarios: 'CABA | EN 3 DIAS EN CASA'
					}
				]
			},
			{
				name: "PAIS",
				transportes:[
					{
						name: 'Correo Argentina',
						image: '~/assets/correo_argentino.png',
						precio: 1140,
						oferta: null,
						comentarios: null
					},
					{
						name: 'OCA',
						image: '~/assets/oca.png',
						precio: 1290,
						oferta: null,
						comentarios: null
					},
				]
			},
		]
	},
	{
		name: "Envíos a sucursal",
		direcciones:[
			{
				name: "CABA",
				transportes:[
					{
						name: 'Correo Argentina',
						image: '~/assets/correo_argentino.png',
						precio: 740,
						oferta: null,
						comentarios: null
					},
					{
						name: 'OCA',
						image: '~/assets/oca.png',
						precio: 850,
						oferta: null,
						comentarios: null
					},
				]
			},
			{
				name: "GBA",
				transportes:[
					{
						name: 'Correo Argentina',
						image: '~/assets/correo_argentino.png',
						precio: 740,
						oferta: null,
						comentarios: null
					},
					{
						name: 'OCA',
						image: '~/assets/oca.png',
						precio: 850,
						oferta: null,
						comentarios: null
					},
				]
			},
			{
				name: "PAIS",
				transportes:[
					{
						name: 'Correo Argentina',
						image: '~/assets/correo_argentino.png',
						precio: 740,
						oferta: null,
						comentarios: null
					},
					{
						name: 'OCA',
						image: '~/assets/oca.png',
						precio: 850,
						oferta: null,
						comentarios: null
					},
				]
			},
		]
	},
	{
		name: "Envíos a terminal *",
		direcciones:[
			{
				name: "CABA",
				transportes:[
					{
						name: null,
						image: '',
						precio: null,
						oferta: null,
						comentarios: '* Pago anticipado. No al retirar en la terminal'
					},
				]
			},
			{
				name: "GBA",
				transportes:[
					{
						name: 'Integral Pack',
						image: '~/assets/integralpack.png',
						precio: 850,
						oferta: null,
						comentarios: "Servicio express 2 a 3 dias"
					},
				]
			},
			{
				name: "PAIS",
				transportes:[
					{
						name: 'Integral Pack',
						image: '~/assets/integralpack.png',
						precio: 850,
						oferta: null,
						comentarios: "Servicio express 3 a 4 dias"
					},
				]
			},
		]
	},
	{
		name: "Transporte tradicional",
		direcciones:[
			{
				name: "CABA",
				transportes:[
					{
						name: null,
						image: '',
						precio: null,
						oferta: null,
						comentarios: null
					},
				]
			},
			{
				name: "GBA",
				transportes:[
					{
						name: null,
						image: '',
						precio: null,
						oferta: null,
						comentarios: null
					},
				]
			},
			{
				name: "PAIS",
				transportes:[
					{
						name: 'Envio hasta transporte',
						isName: true,
						image: '',
						precio: 150,
						oferta: null,
						comentarios: 'El destino se paga el resto'
					},
				]
			},
		]
	},
]
