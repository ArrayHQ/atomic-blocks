/**
 * Inspector Controls
 */

 // Import icons
import icons from './icons';
import map from 'lodash/map';
import layoutColumns from './layout-columns';

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const {
	InspectorControls,
} = wp.editor;

// Import Inspector components
const {
	Toolbar,
	PanelBody,
	PanelRow,
	RangeControl,
	ButtonGroup,
	Button,
	Tooltip,
	Dashicon
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const {
			attributes: {
				columns,
				columnsGap,
				layoutClass,
			},
			isSelected,
			className,
			setAttributes
		} = this.props;

		let selectedRows = 1;

		if ( columns ) {
			selectedRows = parseInt( columns.toString().split('-') );
		}

		return (
		<InspectorControls key="inspector">
			<PanelBody>
				<RangeControl
					label={ __( 'Layout Columns', 'atomic-blocks' ) }
					value={ columns }
					onChange={ ( value ) => this.props.setAttributes( { columns: value } ) }
					min={ 1 }
					max={ 6 }
				/>
				<RangeControl
					label={ __( 'Layout Columns Gap', 'atomic-blocks' ) }
					value={ columnsGap }
					onChange={ ( value ) => this.props.setAttributes( { columnsGap: value } ) }
					min={ 0 }
					max={ 5 }
					step={ 1 }
				/>

				<ButtonGroup aria-label={ __( 'Column Layout', 'atomic-blocks' ) }>
					{ map( layoutColumns[ selectedRows ], ( { name, key, icon, col, layout } ) => (
						<Tooltip text={ name }>
							<Button
								key={ key }
								className="kt-layout-btn"
								//isSmall
								// isPrimary={ selectColLayout === key }
								// aria-pressed={ selectColLayout === key }
								onClick={ () => this.props.setAttributes( {
									layoutClass: layout,
									columns: col,
								} ) }
							>
								{ icon }
							</Button>
						</Tooltip>
					) ) }
				</ButtonGroup>
			</PanelBody>
		</InspectorControls>
		);
	}
}
