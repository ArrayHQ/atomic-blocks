/**
 * Edit component.
 */

 /**
 * Import dependencies.
 */
import _times from 'lodash/times';
import Inspector from './inspector';
import LayoutModal from './layout/layout-modal';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Placeholder } = wp.components;
const { Component, Fragment } = wp.element;
const {
	BlockControls,
	BlockAlignmentToolbar,
} = wp.editor;

export default class Edit extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	componentDidMount() {
		if ( ! this.props.attributes.uniqueID ) {
			this.props.setAttributes( {
				uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
			} );
		} else if ( this.props.attributes.uniqueID && this.props.attributes.uniqueID !== '_' + this.props.clientId.substr( 2, 9 ) ) {
			this.props.setAttributes( {
				uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
			} );
		}
	}

	render() {

		const {
			attributes,
			setAttributes,
			clientId,
		} = this.props;

		/* Placeholder with layout modal */
		return [
			<Fragment>
				<BlockControls key="controls">
					<BlockAlignmentToolbar
						value={ attributes.align }
						onChange={ align => setAttributes( { align } ) }
						controls={ [ 'center', 'wide', 'full' ] }
					/>
				</BlockControls>
				<Inspector { ...{ setAttributes, ...this.props } } />
				<Placeholder
					key="placeholder"
					label={ __( 'Layout Selector', 'atomic-blocks' ) }
					instructions={ __( 'Launch the layout library to browse pre-designed sections.', 'atomic-blocks' ) }
					className={ 'ab-layout-selector-placeholder' }
					icon="layout"
				>
					<LayoutModal clientId={ clientId } />
				</Placeholder>
			</Fragment>
		];
	}
}