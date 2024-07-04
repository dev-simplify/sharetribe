import React, { useEffect } from 'react';
import { bool, func, object, string } from 'prop-types';
import { useField } from 'react-final-form';

import { FieldCheckbox } from '../../../components';
import { userLocation } from '../../../util/maps'; // Import userLocation
import css from './CurrentLocationFilter.module.css';

const CurrentLocationFilter = props => {
  const {
    id,
    name,
    label,
    initialValues,
    onSubmit,
  } = props;

  const {
    input: { value, onChange },
  } = useField(name, { initialValue: initialValues[name] || [] });

  useEffect(() => {
    userLocation()
      .then(location => {
        onChange(location);
        onSubmit({ [name]: location });
      })
      .catch(error => {
        console.error('Error getting user location:', error);
      });
  }, [onChange, name, onSubmit]);

  return (
    <div className={css.root}>
      <label className={css.label}>{label}</label>
      <FieldCheckbox id={id} name={name} value={value} />
    </div>
  );
};

CurrentLocationFilter.defaultProps = {
  initialValues: {},
};

CurrentLocationFilter.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  label: string.isRequired,
  initialValues: object,
  onSubmit: func.isRequired,
};

export default CurrentLocationFilter;
