import { MDCRipple } from '@material/ripple'
import { MDCTextField } from '@material/textfield'

export const button = {
	inserted(el) {
		new MDCRipple(el)
		console.log('ran')
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

export const textFieldCustom = {
	inserted(el, binding) {
		const input = getElement('mdc-text-field__input')
		if (binding.value) {
			addClass(el, 'mdc-text-field--label-floating')
			add('mdc-floating-label', 'mdc-floating-label--float-above')
		}
		
		const observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (mutation.attributeName === 'invalid') {
					if (el.getAttribute('invalid')) {
						addClass(el, 'mdc-text-field--invalid')
					} else {
						removeClass(el, 'mdc-text-field--invalid')
					}
				}
			})
		})
		
		observer.observe(el, {
			attributes: true //configure it to listen to attribute changes
		})
		input.onfocus = () => {
			focus()
		}
		
		input.onblur = () => {
			blur()
		}
		
		function focus() {
			add('mdc-floating-label', 'mdc-floating-label--float-above')
			addClass(el, 'mdc-text-field--focused')
			add('mdc-line-ripple', 'mdc-line-ripple--active')
		}
		
		function blur() {
			if (input.value.length <= 0) {
				remove('mdc-floating-label', 'mdc-floating-label--float-above')
			}
			removeClass(el, 'mdc-text-field--focused')
			remove('mdc-line-ripple', 'mdc-line-ripple--active')
		}
		
		function add(className, newClass) {
			let element = getElement(className)
			addClass(element, newClass)
		}
		
		function getElement(className) {
			return el.getElementsByClassName(className)[0]
		}
		
		function addClass(element, newClass) {
			element.classList.add(newClass)
		}
		
		function remove(className, newClass) {
			let element = getElement(className)
			removeClass(element, newClass)
		}
		
		function removeClass(element, newClass) {
			element.classList.remove(newClass)
		}
	}
}
