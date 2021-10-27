import { renderHook, act } from '@testing-library/react-hooks';
import useForm from './index';

describe('useForm()', () => {
  describe('when user types', () => {
    test('change the value', async () => {
      const initialValues = { info: 'someinfo' };

      const { result } = renderHook(() => useForm({
        initialValues,
        validateSchema: () => Promise.resolve(null),
      }));

      expect(result.current.values).toEqual(initialValues);

      const event = {
        target: {
          getAttribute: () => 'info',
          value: 'anotherinfo',
        },
      };
      act(() => result.current.handleChange(event));
      expect(result.current.values).toEqual({ info: 'anotherinfo' });
    });
  });
});
