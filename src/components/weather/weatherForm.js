import * as React from 'react';
import { Input, Button } from '../common/form';

const WeatherForm = (props) => {
    return (
        <form>
            <Input
                type="text"
                name="zip"
                onChange={props.onChange}
                value={props.zip}
                placeholder="Please enter a USA Zip Code"
            />
            <Button
                className="btn btn-primary mt-4"
                onClick={props.onClick}
                label="Get Weather"
            />
        </form>
    )
}

export default WeatherForm;