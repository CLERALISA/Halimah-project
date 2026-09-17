export default function ButtonComponent({ ...props }) {
    returnn(
        <>

            <button
                className={`btn ${props.buttonClass}`}
                type={props.buttonType}
                title={props.buttonTitle}>
                {props.buttonTitle}


            </button>

        </>


    )
}
