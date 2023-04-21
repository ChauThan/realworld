interface Props {
    messages: string[] | undefined;
}

export default function ErrorMessage({ messages }: Props) {
    if(!messages){
        return(<></>);
    }
    return (
        <ul className="error-messages">
            {messages.map(m => {
                return (
                    <li>{m}</li>
                );
            })}
        </ul>
    )
}