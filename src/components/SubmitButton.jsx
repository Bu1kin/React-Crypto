import {useEffect, useState} from "react";
import {Button, Form} from "antd";

export const SubmitButton = ({form, content, style}) => {
    const [submittable, setSubmittable] = useState(false);

    // Watch all values
    const values = Form.useWatch([], form);
    useEffect(() => {
        form.validateFields({
            validateOnly: true,
        }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values]);
    return (
        <Button type="primary" htmlType="submit" disabled={!submittable} style={style}>
            {content}
        </Button>
    );
};