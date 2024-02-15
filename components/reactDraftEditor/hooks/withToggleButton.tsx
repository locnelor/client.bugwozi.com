import { ToggleButtonEditorPtops } from "../components/ToggleButton"


const withToggleButton = (Component: (props: ToggleButtonEditorPtops) => JSX.Element) => {
    return Component
}
export default withToggleButton