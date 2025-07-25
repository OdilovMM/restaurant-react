import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Avatar, Box, Stack } from '@mui/material';
import { Send } from '@mui/icons-material';
import '../../../css/community.css';
import { SocketContext } from '../../context/socket';
import { ChatGreetMsg, ChatInfoMsg, ChatMessage } from '../../../types/others';
import { verifiedMemberData } from '../../apiServices/verify';
import assert from 'assert';
import { Definer } from '../../../lib/Definer';
import {
	sweetErrorHandling,
	sweetFailureProvider,
} from '../../../lib/sweetAlert';
import { RippleBadge } from '../../MaterialTheme/styled';

const NewMessage = (data: any) => {
	if (data.new_message.mb_id == verifiedMemberData?.mb_id) {
		return (
			<Box
				flexDirection={'row'}
				style={{ display: 'flex' }}
				alignItems={'flex-end'}
				justifyContent={'flex-end'}
				sx={{ m: '10px 0px' }}
			>
				<div className='msg_right'>{data.new_message.msg}</div>
			</Box>
		);
	} else {
		return (
			<Box
				flexDirection={'row'}
				style={{ display: 'flex' }}
				sx={{ m: '10px 0px' }}
			>
				<Avatar
					alt={data.new_message.mb_nick}
					src={data.new_message.mb_image}
				/>
				<div className='msg_left'>{data.new_message.msg}</div>
			</Box>
		);
	}
};

export function CommunityChats() {
	/** Initializations */
	const [messagesList, setMessagesList] = useState([]);
	const socket = useContext(SocketContext);
	const [onlineUsers, setOnlineUsers] = useState<number>(0);
	const textInput: any = useRef(null);
	const [message, setMessage] = useState<string>('');
	useEffect(() => {
		socket.connect();

		socket?.on('connect', () => {});

		socket.on('newMsg', (new_message: ChatMessage) => {
			messagesList.push(
				// @ts-ignore
				<NewMessage new_message={new_message} key={messagesList.length} />
			);
			setMessagesList([...messagesList]);
		});
		socket.on('greetMsg', (msg: ChatGreetMsg) => {
			messagesList.push(
				// @ts-ignore
				<p
					style={{
						textAlign: 'center',
						fontSize: 'large',
						fontFamily: 'serif',
					}}
				>
					{msg.text}, dear {verifiedMemberData?.mb_nick ?? 'guest'}!
				</p>
			);
			setMessagesList([...messagesList]);
		});
		socket.on('infoMsg', (msg: ChatInfoMsg) => {
			setOnlineUsers(msg.total);
		});

		return () => {
			socket.disconnect();
		};
	}, [socket]);

	/** HANDLERS */
	const getInputMessageHandler = useCallback(
		(e: any) => {
			const text = e.target.value;
			setMessage(text);
		},
		[message]
	);

	const getKeyHandler = (e: any) => {
		try {
			if (e.key == 'Enter') {
				assert.ok(message, Definer.input_err3);
				onClickHandler();
			}
		} catch (err) {
			sweetErrorHandling(err).then();
		}
	};

	const onClickHandler = () => {
		try {
			if (!verifiedMemberData) {
				textInput.current.value = '';
				sweetFailureProvider('Please login first!', true);
				return false;
			}
			textInput.current.value = '';
			assert.ok(message, Definer.input_err3);

			const mb_image_url = verifiedMemberData?.mb_image
				? verifiedMemberData?.mb_image
				: '/auth/default_user.svg';
			socket.emit('createMsg', {
				msg: message,
				mb_id: verifiedMemberData?.mb_id,
				mb_nick: verifiedMemberData?.mb_nick,
				mb_image: mb_image_url,
			});
			setMessage('');
			// Clean input
			// Send msg
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};
	return (
		<Stack className='chat_frame'>
			<Box className='chat_top'>
				<div>Jonli Muloqot </div>
				<RippleBadge
					style={{
						margin: '-30px 0 0 20px',
					}}
					badgeContent={onlineUsers}
				/>
			</Box>
			<Box className='chat_content'>
				<Stack className='chat_main'>
					<Box
						flexDirection={'row'}
						style={{ display: 'flex' }}
						sx={{ m: '10px 0px' }}
					>
						<div className='msg_left'>Bu yerda jonli muloqot</div>
					</Box>
					{messagesList}
					{/* boshqa */}
				</Stack>
			</Box>
			<Box className='chat_bott'>
				<input
					ref={textInput}
					type='text'
					name='message'
					className='msg_input'
					placeholder="Xabar jo'natish"
					onChange={getInputMessageHandler}
					onKeyDown={getKeyHandler}
				/>
				<button className='send_msg_btn' onClick={onClickHandler}>
					{/*checke*/}
					<Send style={{ color: 'red' }} />
				</button>
			</Box>
		</Stack>
	);
}
