import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import './filepond.scss';
import './index.scss';
import './validate.scss';

import successGraph from './assets/success.png';
import Modal from '../../components/modal';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


class contactForm extends Component {

	constructor(props) {
		super(props);
	    this.state = {
	    	sentForm : false,
	    	files: [
	        {
	          source: "index.html",
	          options: {
	            type: "local"
	          }
	        }
	      ]
	    };
	}

	formSent = (e) => {
		e.preventDefault();
		this.setState({ sentForm : true });
	}

	render() {
	    return (
	        <div className="contact-form">
	        	<section className="form">
			      	<form action="">
			      		<div className="row">
				      		<div className="input-group half">
					     		<label htmlFor="name">Nome *</label>
					     		<input name="name" type="text" />
				      		</div>
				      		<div className="input-group half">
					     		<label htmlFor="email">E-mail *</label>
					     		<input name="email" type="email" />
				      		</div>
			      		</div>
			      		<div className="input-group">
				      		<label htmlFor="message">Mensagem *</label>
				      		<textarea name="message"></textarea>
			      		</div>
			      		<div className="input-group half">
				      		<label htmlFor="birthdate">Data de nascimento *</label>
				      		<input name="birthdate" type="date" />
			      		</div>
			      		<div className="input-group">
				      		<label htmlFor="files"><span>Clique aqui</span> para anexar arquivos a partir do seu computador.</label>
							<FilePond
								ref={ref => (this.pond = ref)}
								files={this.state.files}
								allowMultiple={true}
								maxFiles={3}
								server="/api"
								labelIdle="Arraste e solte os arquivos ou <span class='filepond--label-action'>selecione</span>"
								labelInvalidField="Arquivo inválido detectado"
								labelFileWaitingForSize="Calculando tamanho"
								labelFileSizeNotAvailable="Acima do tamanho permitido"
								labelFileLoading="Carregando"
								labelFileLoadError="Erro durante carregamento"
								labelFileProcessing="Enviando"
								labelFileProcessingComplete="Envio concluído"
								labelFileProcessingAborted="Envio cancelado"
								labelFileProcessingError="Erro ao enviar"
								labelFileProcessingRevertError="Erro ao desfazer"
								labelFileRemoveError="Erro ao remover arquivo"
								labelTapToCancel="Toque para cancelar"
								labelTapToRetry="Toque para tentar novamente"
								labelTapToUndo="Toque para desfazer"
								labelButtonRemoveItem="Remover"
								labelButtonAbortItemLoad="Cancelar"
								labelButtonRetryItemLoad="Tentar novamente"
								labelButtonAbortItemProcessing="Cancelar"
								labelButtonUndoItemProcessing="Desfazer"
								labelButtonRetryItemProcessing="Tentar novamente"
								labelButtonProcessItem="Enviar"
								onupdatefiles={fileItems => {
									// Set currently active file objects to this.state
									this.setState({
										files: fileItems.map(fileItem => fileItem.file)
									});
								}}
							/>
			      		</div>
			      		<div className="input-group">
				      		<button className="button gradient fullwidth" onClick={this.formSent} id="enviar">	// Revisar
				      			Enviar
				      		</button>
			      		</div>
			      	</form>
		      	</section>
                <Modal title="Sucesso!" show={this.state.sentForm} showHeader={false}>
					<section className="success">
						<img src={successGraph} alt="Mensagem enviada" />
						<h2>Mensagem enviada!</h2>
						<p>Agradecemos o seu contato.<br/>Retornaremos o mais breve possível.</p>
						<button className="button white close-modal" id="voltar">
							Voltar
						</button>
					</section>
                </Modal>
			</div>
	    );
	}

}

export default contactForm;

