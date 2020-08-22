import { MDCRipple } from '@material/ripple'
import { MDCTextField } from '@material/textfield'

export const button = {
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
