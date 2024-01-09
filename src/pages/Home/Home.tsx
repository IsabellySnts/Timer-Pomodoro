import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'

//funcao para definir as validações dos campos do form
//recebo o dado do form em formato de objeto por isso o zod.object
const newCycleFormValidationSchema= zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutes: zod.number().min(5, "O ciclo precisa ser de no minimo 5 minutos.").max(60, "O ciclo precisa ser de no máximo 60 minutos.")
})

export function Home() {

    const {register, handleSubmit, watch}= useForm({
        resolver: zodResolver(newCycleFormValidationSchema),
    });

    function handleCreateNewCycle(data: any){
        console.log(data);
    }

    const task =watch("task");
    const isSubmitDisabled = !task;
   

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
                     {...register("task")} />

                    <datalist id="task-suggestions">
                        <option value="Projeto Feed Ignite"/>
                    </datalist>

                    <label htmlFor="">Durante</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutes"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                        {...register("minutes", {valueAsNumber:true})} />
                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>

                    <Separator>:</Separator>

                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>
                <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>


        </HomeContainer>
    )
}