define({

	root: { $ref: 'dom!contactsApp' },
	
	theme: { module: 'theme/basic.css' },

	//
	// VIEWS
	//
	headerView: {
		render: {
			template: { module: 'text!app/header/template.html' },
			replace: { module: 'i18n!app/header/strings' },
			css: { module: 'css!app/header/style.css' }
		},
		insert: { first: 'root' }
	},

	contactsContainer: { $ref: 'dom.first!.contacts-view-container', at: 'root' },

	listView: {
		render: {
			template: {module: 'text!app/list/template.html' },
			css: { module: 'css!app/list/style.css' }
		},
		insert: { first: 'contactsContainer' },
		bind: {
			to: { $ref: 'contacts' },
			comparator: 'lastName', // TODO: Create a custom comparator to sort by lastName then firstName
			bindings: {
				firstName: '.first-name',
				lastName: '.last-name'
			}
		}
	},

	editView: {
		render: {
			template: { module: 'text!app/edit/template.html' },
			replace: { module: 'i18n!app/edit/strings' },
			css: { module: 'css!app/edit/style.css' }
		},
		insert: { last: 'contactsContainer' }
	},

	editForm: {
		element: { $ref: 'dom.first!form', at: 'editView' },
		connect: { 
			'contacts.onUpdate': 'reset'
		}
	},
	
	footerView: {
		render: {
			template: { module: 'text!app/footer/template.html' },
			replace: { module: 'i18n!app/footer/strings.js' },
			css: { module: 'css!app/footer/style.css' }
		},
		insert: { last: 'root' }
	},
	
	//
	// CONTROLLER
	//
	controller: {
		create: {
			module: 'app/controller',
			args: { $ref: 'editForm' }
		},
		on: {
			editForm: {
				'submit' : 'form.getValues | contacts.update'
			},
			listView: {
				'click:.contact':'contacts.edit'
			}
		},
		connect: {
			'contacts.onEdit': 'editContact'
		}
	},
	
	//
	// COLA
	//
	contacts: {
		create: {
			module: 'cola/Collection',
			args: {
				strategyOptions: {
					validator: { module: 'app/edit/validateContact' }
				}
			}
		},
		before: {
			add: 'cleanContact | generateMetadata',
			update: 'cleanContact | generateMetadata'
		}
	},

	contactStore: {
		create: {
			module: 'cola/adapter/LocalStorage',
			args: 'contacts-demo'
		},
		bind: {
			to: { $ref: 'contacts' }
		}
	},
	
	//
	// HELPERS
	//
	form: { module: 'cola/dom/form' },
	cleanContact: { module: 'app/contacts/cleanContact' },
	generateMetadata: { module: 'app/contacts/generateMetadata' },


	// Wire.js plugins
	plugins: [
		{ module: 'wire/dom', classes: { init: 'loading' } },
		{ module: 'wire/dom/render' },
		{ module: 'wire/on' },
		{ module: 'wire/aop' },
		{ module: 'wire/connect' },
		{ module: 'cola' }
		
	]
});