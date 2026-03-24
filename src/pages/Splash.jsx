import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Splash() {
	const navigate = useNavigate();
	const [bVisible, setBVisible] = useState(true);

	useEffect(() => {
		const iTimer = setTimeout(() => {
			navigate('/app');
		}, 2800);
		return () => clearTimeout(iTimer);
	}, [navigate]);

	return (
		<div
			className="fixed inset-0 flex flex-col items-center justify-center"
			style={{ backgroundColor: '#121212' }}
		>
			{/* Background grid */}
			<div
				className="absolute inset-0 opacity-10"
				style={{
					backgroundImage: `
						linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px),
						linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)
					`,
					backgroundSize: '60px 60px',
				}}
			/>

			{/* Glow orb */}
			<motion.div
				className="absolute rounded-full"
				style={{
					width: 400,
					height: 400,
					background: 'radial-gradient(circle, rgba(139,0,0,0.25) 0%, transparent 70%)',
				}}
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1.2, opacity: 1 }}
				transition={{ duration: 2, ease: 'easeOut' }}
			/>

			<motion.div
				className="relative z-10 flex flex-col items-center gap-4"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: 'easeOut' }}
			>
				{/* Logo mark */}
				<motion.div
					className="flex items-center gap-3 mb-2"
					initial={{ scale: 0.7 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<svg width="52" height="52" viewBox="0 0 52 52" fill="none">
						<circle cx="14" cy="26" r="10" fill="#8B0000" stroke="#D4AF37" strokeWidth="2" />
						<circle cx="38" cy="14" r="8" fill="#8B0000" stroke="#D4AF37" strokeWidth="2" />
						<circle cx="38" cy="38" r="8" fill="#8B0000" stroke="#D4AF37" strokeWidth="2" />
						<line x1="22" y1="22" x2="31" y2="17" stroke="#D4AF37" strokeWidth="2" />
						<line x1="22" y1="30" x2="31" y2="35" stroke="#D4AF37" strokeWidth="2" />
					</svg>
				</motion.div>

				{/* Title */}
				<h1
					className="font-grotesk font-bold tracking-tight"
					style={{
						fontSize: '3.5rem',
						color: '#F0F4F8',
						letterSpacing: '-0.02em',
					}}
				>
					Grapple<span style={{ color: '#D4AF37' }}>Graph</span>
				</h1>

				{/* Tagline */}
				<motion.p
					className="font-inter font-light tracking-widest uppercase text-sm"
					style={{ color: '#8899AA', letterSpacing: '0.2em' }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.8 }}
				>
					Master the Why, Not Just the Move.
				</motion.p>

				{/* Loading bar */}
				<motion.div
					className="mt-10 rounded-full overflow-hidden"
					style={{ width: 180, height: 2, backgroundColor: '#2A2E33' }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8 }}
				>
					<motion.div
						className="h-full rounded-full"
						style={{ backgroundColor: '#D4AF37' }}
						initial={{ width: '0%' }}
						animate={{ width: '100%' }}
						transition={{ delay: 0.8, duration: 1.8, ease: 'easeInOut' }}
					/>
				</motion.div>
			</motion.div>
		</div>
	);
}