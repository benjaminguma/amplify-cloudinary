import './App.css';
import { useState } from 'react';
import Amplify, { API } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);
function App() {
	const [loading, setLoading] = useState(false);
	const [file, setFile] = useState(null);
	const [res, setRes] = useState({});

	const fileToDataURL = (file) =>
		new Promise((res, rej) => {
			const fileReader = new FileReader();
			fileReader.onload = () => res(fileReader.result);
			fileReader.onerror = () => rej(fileReader.error);
			fileReader.readAsDataURL(file);
		});

	const handleSelectFile = (e) => setFile(e.target.files[0]);
	const handleUpload = async () => {
		try {
			setLoading(true);
			// const b64 = await fileToDataURL(file);
			const data = new FormData();

			data.append('file', file);

			// const init = {
			// 	body: {
			// 		file: b64,
			// 	},
			// };

			const init = {
				body: data,
			};
			const res = await API.post('myapigateway', '/upload', init);
			setRes(res);

			alert('uploaded successfully ');
		} catch (error) {
			alert(error.message);
			console.log({ error });
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className='App'>
				<label htmlFor='file' className='btn-grey'>
					{' '}
					select image or video
				</label>
				{file && (
					<div>
						<center> {file.name}</center>
					</div>
				)}
				<form onSubmit={handleUpload} encType='multipart/formdata'>
					<input
						id='file'
						type='file'
						onChange={handleSelectFile}
						multiple={false}
						accept='image/*,video/*'
						name='file'
					/>
				</form>
				{file && (
					<>
						<button className='btn-green'>{loading ? 'uploading...' : 'upload'}</button>
					</>
				)}
			</div>
			{Object.keys(res).length && (
				<code>
					{Object.keys(res).map((key) => (
						<p className='output-item' key={key}>
							<span>{key}:</span>
							<span>{typeof res[key] === 'object' ? 'object' : res[key]}</span>
						</p>
					))}
				</code>
			)}
		</>
	);
}

export default App;

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
