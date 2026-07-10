import { useMemo, useState, type FormEvent } from 'react';
import { CheckIcon } from './Icons';

type Fields = 'name' | 'email' | 'phone' | 'date' | 'time' | 'people' | 'environment' | 'rules';
type Errors = Partial<Record<Fields, string>>;

const timeSlots = ['10:00', '11:30', '12:00', '13:30', '15:00', '15:30', '17:00', '18:30'];
const unavailable = new Set(['12:00', '15:30']);

function localDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export function ReservationSection() {
  const [selectedTime, setSelectedTime] = useState('');
  const [submitted, setSubmitted] = useState<{ name: string; date: string; time: string } | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const minDate = useMemo(() => localDate(), []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Errors = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').replace(/\D/g, '');
    const date = String(data.get('date') ?? '');
    const people = Number(data.get('people'));
    if (name.length < 3) next.name = 'Conte seu nome completo.';
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Informe um e-mail válido.';
    if (phone.length < 10) next.phone = 'Informe um telefone com DDD.';
    if (!date || date < minDate) next.date = 'Escolha uma data a partir de hoje.';
    if (!selectedTime) next.time = 'Escolha um dos horários disponíveis.';
    if (!people || people < 1 || people > 6) next.people = 'Reservas online comportam de 1 a 6 pessoas.';
    if (!data.get('environment')) next.environment = 'Escolha uma preferência de ambiente.';
    if (!data.get('rules')) next.rules = 'É preciso aceitar as regras de convivência.';
    setErrors(next);
    if (Object.keys(next).length) {
      window.setTimeout(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0);
      return;
    }
    setSubmitted({ name, date, time: selectedTime });
    form.reset(); setSelectedTime('');
  };

  if (submitted) return (
    <section id="reservas" className="section reservation-section">
      <div className="reservation-success" role="status">
        <span className="success-seal"><CheckIcon /></span><span className="eyebrow">Reserva demonstrativa confirmada</span>
        <h2>Até logo, {submitted.name.split(' ')[0]}.</h2>
        <p>Guardamos uma mesa para {new Date(`${submitted.date}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}, às {submitted.time}. Nenhum dado foi enviado para serviços externos.</p>
        <button className="button button--dark" onClick={() => setSubmitted(null)}>Fazer outra reserva</button>
      </div>
    </section>
  );

  const fieldError = (field: Fields) => errors[field] ? <span className="field-error" id={`${field}-error`}>{errors[field]}</span> : null;
  return (
    <section id="reservas" className="section reservation-section" aria-labelledby="reservation-title">
      <div className="reservation-intro"><span className="eyebrow">Reserve seu intervalo</span><h2 id="reservation-title">Um lugar tranquilo espera por você.</h2><p>As visitas têm duração sugerida de 90 minutos. Em horários de descanso dos gatos, a experiência continua com o café, o jardim e a biblioteca.</p><div className="reservation-facts"><span><strong>2 ambientes</strong> Salão silencioso ou jardim coberto</span><span><strong>Até 6 pessoas</strong> Grupos maiores por telefone</span><span><strong>Sem taxa</strong> Cancelamento com 2h de antecedência</span></div></div>
      <form className="reservation-form" onSubmit={submit} noValidate>
        <div className="form-grid">
          <label className="field">Nome completo<input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{fieldError('name')}</label>
          <label className="field">E-mail<input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />{fieldError('email')}</label>
          <label className="field">Telefone<input name="phone" type="tel" autoComplete="tel" placeholder="(11) 99999-9999" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />{fieldError('phone')}</label>
          <label className="field">Data<input name="date" type="date" min={minDate} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? 'date-error' : undefined} />{fieldError('date')}</label>
          <label className="field">Pessoas<select name="people" defaultValue="2" aria-invalid={Boolean(errors.people)} aria-describedby={errors.people ? 'people-error' : undefined}>{[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'pessoa' : 'pessoas'}</option>)}</select>{fieldError('people')}</label>
          <label className="field">Preferência de ambiente<select name="environment" defaultValue="" aria-invalid={Boolean(errors.environment)} aria-describedby={errors.environment ? 'environment-error' : undefined}><option value="" disabled>Selecione</option><option>Salão silencioso</option><option>Jardim coberto</option><option>Sem preferência</option></select>{fieldError('environment')}</label>
        </div>
        <fieldset className="time-fieldset" aria-describedby={errors.time ? 'time-error' : undefined}><legend>Horário</legend><p>Indisponibilidades abaixo são demonstrativas.</p><div className="time-grid">{timeSlots.map((time) => <button key={time} type="button" disabled={unavailable.has(time)} className={selectedTime === time ? 'is-selected' : ''} onClick={() => setSelectedTime(time)} aria-pressed={selectedTime === time}>{time}{unavailable.has(time) && <small>Lotado</small>}</button>)}</div>{fieldError('time')}</fieldset>
        <label className="field">Observações <span>(opcional)</span><textarea name="notes" rows={3} maxLength={300} placeholder="Acessibilidade, alergias ou algo que ajude a acolher melhor sua visita." /></label>
        <label className="check-field"><input name="rules" type="checkbox" aria-invalid={Boolean(errors.rules)} aria-describedby={errors.rules ? 'rules-error' : undefined} /><span>Li e aceito as regras de convivência, incluindo respeitar o descanso e a iniciativa dos gatos.</span></label>{fieldError('rules')}
        <button className="button button--accent button--full" type="submit">Confirmar reserva demonstrativa</button>
        <p className="demo-note">Formulário local para demonstração. Nenhum dado é enviado ou armazenado.</p>
      </form>
    </section>
  );
}
