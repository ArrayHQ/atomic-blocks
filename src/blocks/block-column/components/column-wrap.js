/**
 * Column wrapper component.
 */

/**
 * WordPress dependencies.
 */
const { Component } = wp.element;

/**
 * Components and dependencies.
 */
import classnames from 'classnames';
import {
	backgroundImageStyles,
	dimRatioToClass,
} from './../../../utils/components/background-image/shared';

/**
 * Create a Columns wrapper Component.
 */
export default class Columns extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes
		} = this.props;

		/* Setup the background color class. */
		let backgroundColorClass;

		if ( attributes.customBackgroundColor ) {
			backgroundColorClass = 'ab-has-custom-background-color';
		} else {
			backgroundColorClass = attributes.backgroundColor ? 'has-' + attributes.backgroundColor + '-background-color' : null;
		}

		/* Setup the text color class. */
		let textColorClass;

		if ( attributes.customTextColor ) {
			textColorClass = 'ab-has-custom-text-color';
		} else {
			textColorClass = attributes.textColor ? 'has-' + attributes.textColor + '-color' : null;
		}

		/* Setup the wrapper classes. */
		const className = classnames([
			this.props.className,

			attributes.backgroundDimRatio !== 100 ? 'ab-has-background-dim' : null,
			dimRatioToClass( attributes.backgroundDimRatio ),
			attributes.backgroundImgURL && attributes.backgroundSize && attributes.backgroundRepeat === 'no-repeat' ? 'ab-background-' + attributes.backgroundSize : null,
			attributes.backgroundImgURL && attributes.backgroundRepeat ? 'ab-background-' + attributes.backgroundRepeat : null,

			'ab-layout-columns-' + attributes.columns,
			attributes.layout,
			backgroundColorClass,
			textColorClass,
			attributes.columnMaxWidth && attributes.centerColumns ? 'ab-columns-center' : null
		], {
			[ 'align' + attributes.align ]: attributes.align,
			'ab-has-parallax': attributes.hasParallax,
		});

		/* Setup the margin styles. */
		let marginValue;

		if ( attributes.marginSync ) {
			marginValue = {
				marginTop: 0 < attributes.margin ? attributes.margin + attributes.marginUnit : null,
				marginBottom: 0 < attributes.margin ? attributes.margin + attributes.marginUnit : null
			};
		} else {
			marginValue = {
				marginTop: 0 < attributes.marginTop ? attributes.marginTop + attributes.marginUnit : null,
				marginBottom: 0 < attributes.marginBottom ? attributes.marginBottom + attributes.marginUnit : null
			};
		}

		/* Setup the padding styles. */
		let paddingValue;

		if ( attributes.paddingSync ) {
			paddingValue = {
				padding: 0 < attributes.padding ? attributes.padding + attributes.paddingUnit : null
			};
		} else {
			paddingValue = {
				paddingTop: 0 < attributes.paddingTop ? attributes.paddingTop + attributes.paddingUnit : null,
				paddingRight: 0 < attributes.paddingRight ? attributes.paddingRight + attributes.paddingUnit : null,
				paddingBottom: 0 < attributes.paddingBottom ? attributes.paddingBottom + attributes.paddingUnit : null,
				paddingLeft: 0 < attributes.paddingLeft ? attributes.paddingLeft + attributes.paddingUnit : null
			};
		}

		/* Misc styles. */
		const styles = {
			backgroundColor: this.props.backgroundColorValue ? this.props.backgroundColorValue : null,
			color: this.props.textColorValue ? this.props.textColorValue : null,
			backgroundImage: attributes.backgroundImgURL ? `url(${ attributes.backgroundImgURL })` : undefined,
			backgroundPosition: attributes.focalPoint ? `${ attributes.focalPoint.x * 100 }% ${ attributes.focalPoint.y * 100 }%` : undefined
		};

		return (
			<div
				className={ className ? className : undefined }
				style={ Object.assign( marginValue, paddingValue, styles ) }
			>
				{ this.props.children }
			</div>
		);
	}
}
