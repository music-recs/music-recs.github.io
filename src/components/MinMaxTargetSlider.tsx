import { InputLabel, styled } from '@mui/material';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { assert } from '../utils';

const StyledSlider = styled(Slider)(({ theme }) => ({
  height: 3,
  padding: '13px 0',
  margin: '20px',
  boxSizing: 'border-box',
  width: 'calc(100% - 40px)',
  '& .MuiSlider-thumb[data-index="0"],& .MuiSlider-thumb[data-index="2"]': {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .thumb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    height: 3,
  },
}));

type MinMaxThumbComponentProps = React.HTMLAttributes<unknown>;

function MinMaxThumbComponent(props: MinMaxThumbComponentProps) {
  const { children, ...other } = props;

  return (
    <SliderThumb {...other}>
      {children}
      <span className="thumb-bar" />
      <span className="thumb-bar" />
      <span className="thumb-bar" />
    </SliderThumb>
  );
}

function valueLabelFormat(value: string, index: number) {
  if (index === 0) {
    return `Min: ${value}`;
  } else if (index === 1) {
    return `Target: ${value}`;
  } else {
    return `Max: ${value}`;
  }
}

function defaultValueFormat(value: number) {
  return `${value}`;
}

interface SliderProps<T> {
  id: string;
  name: string;
  label: string;
  minValue: number;
  maxValue: number;
  defaultTarget: number;
  step?: number;
  valueFormat?: (value: number) => string;
  control: Control<FieldValues, T>;
}

export const MinMaxTargetSlider = <T,>({
  id,
  name,
  label,
  minValue,
  maxValue,
  defaultTarget,
  step = 0.01,
  valueFormat = defaultValueFormat,
  control,
}: SliderProps<T>) => {
  assert(minValue <= defaultTarget && defaultTarget <= maxValue);
  return (
    <>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Controller
        control={control}
        name={name}
        defaultValue={[minValue, defaultTarget, maxValue]}
        render={({ field }) => (
          <StyledSlider
            id={id}
            name={name}
            min={minValue}
            max={maxValue}
            value={field.value}
            onChange={(_, newValue) => field.onChange(newValue)}
            slots={{ thumb: MinMaxThumbComponent }}
            step={step}
            disableSwap
            valueLabelDisplay="auto"
            valueLabelFormat={(value, index) =>
              valueLabelFormat(valueFormat(value), index)
            }
          />
        )}
      />
    </>
  );
};
