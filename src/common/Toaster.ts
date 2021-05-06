import * as bulmaToast from 'bulma-toast';
import 'animate.css';

export function createToast(message: string, type: bulmaToast.ToastType) {
	bulmaToast.toast({
		message: message,
		type: type,
		animate: { in: 'fadeIn', out: 'fadeOut' },
		position: 'top-right',
		duration: 4000,
	});
}
