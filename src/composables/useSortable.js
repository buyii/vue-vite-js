import { onMounted, onUnmounted, shallowRef } from 'vue';
import Sortable from 'sortablejs';

export function useSortable(container,list,options){
    const insatance = shallowRef()
    onMounted(() => {
        insatance.value = Sortable.create(container.value,{
            ...options,
            onUpdate(event){
                options?.onUpdate?.(event)
                console.log(event)
                const { newIndex, oldIndex } = event
                const oldValue = list.value[oldIndex]
                list.value.splice(oldIndex,1)
                list.value.splice(newIndex,0, oldValue)
                // list.value
            }
        })

        onUnmounted(()=>{
            insatance.value.destroy()
        })
    })
    return insatance
}

