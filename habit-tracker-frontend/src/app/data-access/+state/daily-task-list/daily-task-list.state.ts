import { Action, Selector, State, StateContext } from "@ngxs/store";
import { DailyTaskListStateModel, DefaultDailyTaskListState } from "./daily-task-list-state.model";
import { Injectable } from "@angular/core";
import * as DailyTaskListActions from './daily-task-list-state.action';
import { Habit } from "src/app/models/habit";
import { TaskList } from "src/app/models/task-list";
import { IListItem } from "src/app/models/i-list-item";
import { patch, updateItem } from "@ngxs/store/operators";
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { cloneDeep } from "lodash";
import { findListItemArray } from "src/app/functions/find-list.function";

@State<DailyTaskListStateModel>({
    name: 'dailytasklist',
    defaults: DefaultDailyTaskListState,
})
@Injectable()
export class DailyTaskListState {
    constructor() {}

    // Selectors
    @Selector()
    static getDailyTaskList(state: DailyTaskListStateModel) {
        return state.DailyTaskList;
    }

    // Actions
    @Action(DailyTaskListActions.LoadDailyTaskList)
    loadDailyTaskList(ctx: StateContext<DailyTaskListStateModel>, { userId }: DailyTaskListActions.LoadDailyTaskList) {
        const habit1: Habit = {
            id: 'habitId1',
            name: 'Habit 1 Name',
            priority: 6,
            completed: false,
            parentListId: 'listId1',
            createdByUserId: 'User1',
            recursOn: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
          };
      
          const testList1: TaskList = {
            id: 'insetListId1',
            name: 'Test Inset List 1',
            description: 'Mock Description',
            completed: false,
            isCollapsed: true,
            priority: 4,
            totalTaskCount: 5,
            completedTaskCount: 2,
            createdByUserId: 'User 1',
            listItems: [
              {
                id: 'taskId1',
                parentListId: 'listId1',
                name: 'Task 1 Name',
                priority: 1,
                completed: false,
                createdByUserId: 'User 1'
              },
              {
                id: 'taskId2',
                parentListId: 'listId1',
                name: 'Task 2 Name',
                priority: 2,
                completed: false,
                createdByUserId: 'User 1'
              },
              {
                id: 'taskId3',
                parentListId: 'listId1',
                name: 'Task 3 Name',
                priority: 3,
                completed: true,
                createdByUserId: 'User 1'
              },
              {
                id: 'taskId4',
                parentListId: 'listId1',
                name: 'Task 4 Name',
                priority: 4,
                completed: true,
                createdByUserId: 'User 1'
              },
              {
                id: 'taskId5',
                parentListId: 'listId1',
                name: 'Task 5 Name',
                priority: 5,
                completed: false,
                createdByUserId: 'User 1'
              }
            ]
          }

          const testList2: TaskList = {
            id: 'insetListId2',
            name: 'Test Inset List 2',
            description: 'Mock Description',
            completed: false,
            isCollapsed: true,
            priority: 4,
            totalTaskCount: 5,
            completedTaskCount: 2,
            createdByUserId: 'User 1',
            listItems: [
              {
                id: 'taskId1',
                parentListId: 'listId1',
                name: 'Task 1 Name',
                priority: 1,
                completed: false,
                createdByUserId: 'User 1'
              },
              {
                id: 'taskId2',
                parentListId: 'listId1',
                name: 'Task 2 Name',
                priority: 2,
                completed: false,
                createdByUserId: 'User 1'
              },
              {
                id: 'taskId3',
                parentListId: 'listId1',
                name: 'Task 3 Name',
                priority: 3,
                completed: true,
                createdByUserId: 'User 1'
              },
              {
                id: 'taskId4',
                parentListId: 'listId1',
                name: 'Task 4 Name',
                priority: 4,
                completed: true,
                createdByUserId: 'User 1'
              },
              {
                id: 'taskId5',
                parentListId: 'listId1',
                name: 'Task 5 Name',
                priority: 5,
                completed: false,
                createdByUserId: 'User 1'
              }
            ]
          }
        
      
          const dailyTaskList = {
            id: 'dtListId1',
            name: 'Daily Task List 1',
            description: 'Mock Description',
            completed: false,
            isCollapsed: false,
            priority: 0,
            totalTaskCount: 5,
            completedTaskCount: 2,
            createdByUserId: 'User 1',
            listItems: [
              {
                id: 'taskId1',
                parentListId: 'listId1',
                name: 'Task 1 Name',
                priority: 0,
                completed: false,
                createdByUserId: 'User 1'
              },
              {
                id: 'taskId2',
                parentListId: 'listId1',
                name: 'Task 2 Name',
                priority: 1,
                completed: false,
                createdByUserId: 'User 1'
              },
              {
                id: 'taskId3',
                parentListId: 'listId1',
                name: 'Task 3 Name',
                priority: 2,
                completed: true,
                createdByUserId: 'User 1'
              },
              {
                id: 'taskId4',
                parentListId: 'listId1',
                name: 'Task 4 Name',
                priority: 3,
                completed: true,
                createdByUserId: 'User 1'
              },
              testList1,
              testList2,
              {
                id: 'taskId5',
                parentListId: 'listId1',
                name: 'Task 5 Name',
                priority: 5,
                completed: false,
                createdByUserId: 'User 1'
              },
              habit1,
            ]
          }
        ctx.patchState({ DailyTaskList: dailyTaskList });
    }

    @Action(DailyTaskListActions.UpdateListItem)
    updateListItem(ctx: StateContext<DailyTaskListStateModel>, { listItem }: DailyTaskListActions.UpdateListItem) {
        ctx.setState(patch<DailyTaskListStateModel>({
            DailyTaskList: patch<DailyTaskListStateModel['DailyTaskList']>({
                listItems: updateItem((x) => x.id === listItem.id,
                  listItem
                ),
            }),
        }));
    }

    @Action(DailyTaskListActions.UpdateListCollapsedState)
    updateListCollapsedState(ctx: StateContext<DailyTaskListStateModel>, { listItemId, collapsedState }: DailyTaskListActions.UpdateListCollapsedState) {
      ctx.setState(patch<DailyTaskListStateModel>({
        DailyTaskList: patch<any>({
            listItems: updateItem<any>((x) => x.id === listItemId, patch({ isCollapsed: collapsedState })
            ),
        }),
      }));
    }

    @Action(DailyTaskListActions.HandleItemIndexReorder)
    handleItemIndexReorder(ctx: StateContext<DailyTaskListStateModel>, { ev }: DailyTaskListActions.HandleItemIndexReorder) {
      let dailyTaskListState = cloneDeep(ctx.getState().DailyTaskList);
      let listId = ev.container.id
      if(ev.previousContainer === ev.container) {
        moveItemInArray(findListItemArray(dailyTaskListState, listId)!, ev.previousIndex, ev.currentIndex);
      }
      else {
        let previousListId = ev.previousContainer.id; 
        transferArrayItem(findListItemArray(dailyTaskListState, previousListId)!, findListItemArray(dailyTaskListState, listId)!, ev.previousIndex, ev.currentIndex);
      }
      ctx.setState(patch<DailyTaskListStateModel>({
        DailyTaskList: dailyTaskListState
      }));
    }
}