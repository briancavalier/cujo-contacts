define([], function() {

	function ContactsController(editForm) {
		this._editForm = editForm;
	}

	// TODO: Is there a better way of doing this? e.g., a way to bind the form to the
	//       contact being edited in contacts.onEdit
	ContactsController.prototype.editContact = function(e) {
		this._editForm['id'].value = e.id;
		this._editForm['firstName'].value = e.firstName;
		this._editForm['lastName'].value = e.lastName;
		this._editForm['phone'].value = e.phone;
		this._editForm['email'].value = e.email;		
	};
	
	return ContactsController;

});