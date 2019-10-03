if('serviceWorker' in navigator){
	navigator.serviceWorker.register('../sw.js')
	.then((reg) => console.log('Service worker registrado'))
	.catch((err) => console.log('Service Worker não registrado', err));
}