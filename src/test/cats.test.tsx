import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CatsSection } from '../components/CatsSection';

describe('gatos residentes', () => {
  it('mantém o retrato individual e alterna os perfis', async () => {
    const user = userEvent.setup();
    render(<CatsSection />);

    expect(screen.getByRole('img', { name: 'Retrato de corpo inteiro de Sumi, gato residente da Neko no Ma' })).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: 'Yuki: Curiosa, com seus limites' }));
    expect(screen.getByRole('heading', { name: 'Yuki' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Retrato de corpo inteiro de Yuki, gato residente da Neko no Ma' })).toBeInTheDocument();
    expect(screen.getByText('Em adoção responsável')).toBeInTheDocument();
  });
});
