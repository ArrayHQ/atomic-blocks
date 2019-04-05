/**
 * Inspector Controls
 */

 /**
 * External dependencies.
 */
import map from 'lodash/map';
import layoutColumns from './layout-columns';
import Margin from './../../../utils/components/margin';
import Padding from './../../../utils/components/padding';

// Setup the block
const { __ } = wp.i18n;
const {
	Component,
	Fragment,
} = wp.element;

// Import block components
const {
	InspectorControls,
} = wp.editor;

// Import Inspector components
const {
	PanelBody,
	RangeControl,
	ButtonGroup,
	Button,
	Tooltip,
	ToggleControl,
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
			attributes,
			setAttributes
		} = this.props;

		let selectedRows = 1;

		if ( attributes.columns ) {
			selectedRows = parseInt( attributes.columns.toString().split('-') );
		}

		return (
		<InspectorControls key="inspector">
			<Fragment>
				{ attributes.layout &&
					// Show the column settings once a layout is selected
					<Fragment>
						<PanelBody
							title={ __( 'General', 'atomic-blocks' ) }
							initialOpen={ true }
							className="ab-column-select-panel"
						>
							<p>{ __( 'Column Layout', 'atomic-blocks' ) }</p>
							<ButtonGroup
								aria-label={ __( 'Column Layout', 'atomic-blocks' ) }
							>
								{ map( layoutColumns[ selectedRows ], ( { name, key, icon, col } ) => (
									<Tooltip text={ name }>
										<Button
											key={ key }
											className="ab-layout-selector-button"
											isSmall
											onClick={ () => {
												setAttributes( {
													layout: key,
												} );
												this.setState( { 'selectLayout' : false } );
											} }
										>
											{ icon }
										</Button>
									</Tooltip>
								) ) }
							</ButtonGroup>
							<p><i>{ __( 'Change the layout of your columns.', 'atomic-blocks' ) }</i></p>

							<hr />

							<RangeControl
								label={ __( 'Column Gap', 'atomic-blocks' ) }
								help={ __( 'Adjust the spacing between columns.', 'atomic-blocks' ) }
								value={ attributes.columnsGap }
								onChange={ ( value ) => this.props.setAttributes( { columnsGap: value } ) }
								min={ 0 }
								max={ 10 }
								step={ 1 }
							/>

							<hr />

							<ToggleControl
								label={ __( 'Responsive Columns', 'atomic-blocks' ) }
								help={ __( 'Columns will be adjusted to fit on tablets and mobile devices.', 'atomic-blocks' ) }
								checked={ attributes.responsiveToggle }
								onChange={ () => this.props.setAttributes( { responsiveToggle: ! attributes.responsiveToggle } ) }
							/>
						</PanelBody>
					</Fragment>
				}
				<PanelBody
					title={ __( 'Margin and Padding', 'atomic-blocks' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Sync Margin', 'atomic-blocks' ) }
						help={ __( 'Top and bottom margins will have the same value.', 'atomic-blocks' ) }
						checked={ attributes.marginSync }
						onChange={ () => this.props.setAttributes( { marginSync: ! attributes.marginSync } ) }
					/>

					{ ! attributes.marginSync ?
						<Margin
							// Top margin
							marginEnableTop={ true }
							marginTop={ attributes.marginTop }
							marginTopMin="0"
							marginTopMax="200"
							onChangeMarginTop={ marginTop => setAttributes( { marginTop } ) }
							// Bottom margin
							marginEnableBottom={ true }
							marginBottom={ attributes.marginBottom }
							marginBottomMin="0"
							marginBottomMax="200"
							onChangeMarginBottom={ marginBottom => setAttributes( { marginBottom } ) }
						/>
					:
						<Margin
							// Vertical margin
							marginEnableVertical={ true }
							marginVerticalLabel={ __( 'Margin Top/Bottom', 'atomic-blocks' ) }
							marginVertical={ attributes.margin }
							marginVerticalMin="0"
							marginVerticalMax="200"
							onChangeMarginVertical={ margin => setAttributes( { margin } ) }
						/>
					}

					<hr />

					<ToggleControl
						label={ __( 'Sync Padding', 'atomic-blocks' ) }
						help={ __( 'Padding on all sides will have the same value.', 'atomic-blocks' ) }
						checked={ attributes.paddingSync }
						onChange={ () => this.props.setAttributes( { paddingSync: ! attributes.paddingSync } ) }
					/>

					{ ! attributes.paddingSync ?
						<Padding
							// Padding Top
							paddingEnableTop={ true }
							paddingTop={ attributes.paddingTop }
							paddingTopMin="0"
							paddingTopMax="200"
							onChangePaddingTop={ paddingTop => setAttributes( { paddingTop } ) }
							// Padding Right
							paddingEnableRight={ true }
							paddingRight={ attributes.paddingRight }
							paddingRightMin="0"
							paddingRightMax="200"
							onChangePaddingRight={ paddingRight => setAttributes( { paddingRight } ) }
							// Padding Bottom
							paddingEnableBottom={ true }
							paddingBottom={ attributes.paddingBottom }
							paddingBottomMin="0"
							paddingBottomMax="200"
							onChangePaddingBottom={ paddingBottom => setAttributes( { paddingBottom } ) }
							// Padding Left
							paddingEnableLeft={ true }
							paddingLeft={ attributes.paddingLeft }
							paddingLeftMin="0"
							paddingLeftMax="200"
							onChangePaddingLeft={ paddingLeft => setAttributes( { paddingLeft } ) }
						/>
					:
						<Padding
							// Padding
							paddingEnable={ true }
							padding={ attributes.padding }
							paddingMin="0"
							paddingMax="200"
							onChangePadding={ padding => setAttributes( { padding } ) }
						/>
					}
				</PanelBody>
			</Fragment>
		</InspectorControls>
		);
	}
}
