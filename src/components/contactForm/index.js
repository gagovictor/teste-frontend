import React, { Component } from 'react';
import './index.scss';

class contactForm extends Component {
  render() {
    return (
        <div className="contact-form">
	      	<form>
	      		<div className="row">
		      		<div className="input-group half">
			     		<label for="name">Nome *</label>
			     		<input name="name" type="text" />
		      		</div>
		      		<div className="input-group half">
			     		<label for="email">E-mail *</label>
			     		<input name="email" type="email" />
		      		</div>
	      		</div>
	      		<div className="input-group">
		      		<label for="message">Mensagem *</label>
		      		<textarea name="message"></textarea>
	      		</div>
	      		<div className="input-group half">
		      		<label for="birthdate">Data de nascimento *</label>
		      		<input name="birthdate" type="date" />
	      		</div>
	      		<div className="input-group">
		      		<label for="files"><span>Clique aqui</span> para anexar arquivos a partir do seu computador.</label>
		      		<input name="files" type="file" />
	      		</div>
	      		<div className="input-group">
		      		<input name="submit" type="submit" value="Enviar" className="gradient fullwidth" />
	      		</div>
	      	</form>
      	</div>
    );
  }
}

export default contactForm;
