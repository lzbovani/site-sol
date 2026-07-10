import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReservationSection } from '../components/ReservationSection';

describe('reservas', () => {
  it('explica os campos inválidos sem enviar dados', async () => {
    const user = userEvent.setup();
    render(<ReservationSection />);
    await user.click(screen.getByRole('button', { name: /confirmar reserva/i }));
    expect(screen.getByText('Conte seu nome completo.')).toBeInTheDocument();
    expect(screen.getByText('Informe um e-mail válido.')).toBeInTheDocument();
    expect(screen.getByText('Escolha um dos horários disponíveis.')).toBeInTheDocument();
  });
});
