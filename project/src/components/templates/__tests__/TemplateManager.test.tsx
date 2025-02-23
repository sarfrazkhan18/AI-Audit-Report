import { render, screen } from '@testing-library/react';
import TemplateManager from '../TemplateManager';

describe('TemplateManager', () => {
  test('renders template list', () => {
    render(<TemplateManager />);
    expect(screen.getByText('Report Templates')).toBeInTheDocument();
  });
}); 