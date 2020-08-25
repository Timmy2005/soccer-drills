import { MDCRipple } from '@material/ripple'
import { MDCTextField } from '@material/textfield'
import { MDCList } from '@material/list';

export const button = {
	inserted(el) {
		new MDCRipple(el)
	}
}

export const ripple = {
	inserted(el) {
		new MDCRipple(el)
	}
}

export const textField = {
	inserted(el) {
		new MDCTextField(el)
	}
}

export const iconButton = {
	inserted(el) {
		const iconButtonRipple = new MDCRipple(el);
		iconButtonRipple.unbounded = true;
	}
}

export const list = {
	inserted(el) {
		const list = new MDCList(el)
	}
}
