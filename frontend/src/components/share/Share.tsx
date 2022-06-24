import './share.css';
import {
	PermMedia,
	Label,
	Room,
	EmojiEmotions,
	Cancel,
} from '@mui/icons-material';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import API_URL from '../../api/apiurl';

const Share = () => {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER!;

	const { user } = useContext(AuthContext);
	const descInput = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState(null);

	const fileUploadHandler = async (e: any) => {
		e.preventDefault();

		const desc = descInput.current.value || '';

		const newPost = {
			userId: user._id,
			desc,
			img: '',
		};

		// Upload File
		if (file) {
			const data = new FormData();

			const filename = Date.now() + file.name;

			data.append('name', filename);
			data.append('file', file);

			newPost.img = filename;
			try {
				await axios.post(`${API_URL}/upload`, data);

				// Refresh the page
				window.location.reload();
			} catch (err) {
				console.log(err);
			}
		}

		try {
			await axios.post(`${API_URL}/post`, newPost);
		} catch (error) {}
	};

	return (
		<div className='share'>
			<div className='shareWrapper'>
				<div className='shareTop'>
					<img
						crossOrigin='anonymous'
						className='shareProfileImg'
						src={
							user?.profilePicture
								? PF + user['profilePicture']
								: PF + 'person/noAvatar.png'
						}
						alt=''
					/>
					<input
						type='text'
						className='shareInput'
						placeholder={"What's in your mind " + user.username + '?'}
						ref={descInput}
					/>
				</div>
				<hr className='shareHr' />
				{file && (
					<div className='shareImgContainer'>
						<img className='shareImg' src={URL.createObjectURL(file)} alt='' />
						<Cancel className='shareCancelImg' onClick={() => setFile(null)} />
					</div>
				)}
				<form className='shareBottom' onSubmit={fileUploadHandler}>
					<div className='shareOptions'>
						<label htmlFor='file' className='shareOption'>
							<PermMedia htmlColor='tomato' className='shareIcon' />
							<span className='shareOptionText'>Photo or video</span>
							<input
								type='file'
								style={{ display: 'none' }}
								id='file'
								accept='.png,.jpeg,.jpg'
								onChange={(e) => setFile(e.target.files[0])}
							/>
						</label>
						<div className='shareOption'>
							<Label htmlColor='blue' className='shareIcon' />
							<span className='shareOptionText'>Tag</span>
						</div>
						<div className='shareOption'>
							<Room htmlColor='green' className='shareIcon' />
							<span className='shareOptionText'>Location</span>
						</div>
						<div className='shareOption'>
							<EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
							<span className='shareOptionText'>Feelings</span>
						</div>
					</div>
					<button type='submit' className='shareButton'>
						Share
					</button>
				</form>
			</div>
		</div>
	);
};

export default Share;
