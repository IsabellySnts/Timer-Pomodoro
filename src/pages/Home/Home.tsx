import { HandPalm, Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, StopCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

//funcao para definir as validações dos campos do form
//recebo o dado do form em formato de objeto por isso o zod.object
const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutes: zod.number().min(5, "O ciclo precisa ser de no minimo 5 minutos.").max(60, "O ciclo precisa ser de no máximo 60 minutos.")
})

// inferindo a tipagem automaticamente atraves do newCycleFormValidationSchema
type newFormData = zod.infer<typeof newCycleFormValidationSchema>

//definindo o formato dos ciclos 
interface Cycle {
    id: string,
    task: string,
    minutes: number,
    start: Date,
    interruptedDate?: Date
}

export function Home() {

    //definindo um estado para a lista de ciclos
    const [cycles, setCycles] = useState<Cycle[]>([])

    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0) //guardando o tanto de seg que ja passou

    const { register, handleSubmit, watch, reset } = useForm<newFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutes: 0,

        }
    });

    //percorrendo a lista de ciclos e pegando o ciclo que tem o mesmo id do ciclo
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    useEffect(() => {
        let interval: number
        if (activeCycle) {
            interval = setInterval(() => {
                //calculando a diferença entre a data atual e a data em que começou o ciclo no intervalo de um segundo
                setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.start))
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle])

    function handleCreateNewCycle(data: newFormData) {

        const id = String(new Date().getTime()) // definindo o id como value time em milisegundos
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutes: data.minutes,
            start: new Date()
        }
        setCycles((state) => [...state, newCycle])
        setActiveCycleId(id) // setando o id do ciclo que acabou de ser criado para o estado de ciclo ativo
        setAmountSecondsPassed(0)
        reset(); // volta para os valores originais definidos no defaultValues

    }

    function handleInterruptCycle(){
        setActiveCycleId(null)

        setCycles(cycles.map(cycle =>{
            if (cycle.id === activeCycleId) {
                return {...cycle, interruptedDate: new Date()}
            }else{
                return cycle
            }
        }))
    }



    //se houve um ciclo ativo, convertera o minuto para segundos
    const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    // calculando quantos minutes tem no total e arredondando para baixo
    const minutesAmount = Math.floor(currentSeconds / 60)

    //agora vendo quantos segundos tem do resto da divisao acima
    const secondsAmount = currentSeconds % 60

    //defininando que o minutesAmount e secondsAmount deve ter dois caract, quando nao tiver completar com 0
    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])


    const task = watch("task");
    const isSubmitDisabled = !task;
    console.log(cycles);
    


    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        type="text"
                        list="task-suggestions"
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                        disabled={!!activeCycle}
                        {...register("task")} />

                    <datalist id="task-suggestions">
                        <option value="Projeto Feed Ignite" />
                    </datalist>

                    <label htmlFor="">Durante</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutes"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                        disabled={!!activeCycle}
                        {...register("minutes", { valueAsNumber: true })} />
                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>

                    <Separator>:</Separator>

                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>
                {activeCycle ? (
                    <StopCountdownButton type="button" onClick={handleInterruptCycle}>
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
                )}
            </form>


        </HomeContainer>
    )
}