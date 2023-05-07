<template>
  <div class="search-table-wrapper">
    <div class="search-table-filters" :class="tableOptions.formClass">
      <Component
        v-for="option in tableOptions.formOptions"
        :key="option.name"
        :is="option.type"
        :placeholder="option.label"
        :allowClear="true"
        class="search-table-filters-item"
        v-bind="option.$attrs"
        v-model:value="searchData[option.name]"
      />
    </div>
    <div class="search-table-filters-action-btn-wrapper">
      <slot name="beforeBtn" />
      <Button type="primary" @click="search">查询</Button>
      <Button @click="reset">重置</Button>
      <slot name="afterBtn" />
    </div>
    <!-- Table -->
    <Table
      class="search-table-body"
      :columns="tableOptions.tableCol"
      :dataSource="rows"
      :scroll="{ x: 'max-content' }"
      :loading="loading"
      :pagination="paginationObject"
      tableLayout="fixed"
      v-bind="$attrs"
    >
      <template #bodyCell="params">
        <slot name="bodyCell" v-bind="params" />
      </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
  import { Button, Table } from 'ant-design-vue';
  import { merge } from 'lodash-es';
  import { onMounted, ref, watch } from 'vue';

  const props = defineProps(['options']);
  const loading = ref(false);
  const searchData = ref<any>({});
  const paginationObject = ref<any>({
    page: 1,
    current: 1,
    pageSize: 10,
    showLessItems: true,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共有 ${total} 项`,
    onChange: (page: number) => paginationChanged(page),
    onShowSizeChange: (_: any, size: number) => showSizeChanged(size),
    ...props.options?.pagination,
  });

  const tableOptions = ref<any>({
    fetchNow: true,
  });

  const rows = ref<any[]>([]);

  const search = () => {
    paginationObject.value.page = 1;
    paginationObject.value.current = 1;
    fetch();
  };

  const reset = () => {
    Object.keys(searchData.value).forEach((key: string) => (searchData.value[key] = null));
  };

  const fetch = async () => {
    if (loading.value) return;
    try {
      loading.value = true;

      if (tableOptions.value.beforeQuery) {
        tableOptions.value.beforeQuery(searchData.value);
      }

      const { total, page, pageSize, ...pg } = paginationObject.value;

      const result: any = await tableOptions.value.fetchMethod({
        ...searchData.value,
        page,
        size: Number(pageSize),
      });
      paginationObject.value.current = page;

      if (!props.options.pagination.total) {
        paginationObject.value.total = result.total;
      }

      rows.value = result.rows;
    } catch (e: any) {
    } finally {
      loading.value = false;
    }
  };

  const paginationChanged = (page: number) => {
    paginationObject.value.page = page;
    fetch();
  };

  const showSizeChanged = (size: number) => {
    paginationObject.value.pageSize = size;
    fetch();
  };

  onMounted(() => {
    if (tableOptions.value.fetchNow && tableOptions.value.fetchMethod) {
      fetch();
    }
  });

  watch(
    () => props.options,
    () => {
      tableOptions.value = merge(props.options, tableOptions.value);
      paginationObject.value = merge(paginationObject.value, props.options.pagination);
    },
    { immediate: true },
  );

  defineExpose({
    fetch,
    reset,
    search,
  });
</script>

<style lang="less" scoped>
  .search-table-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }

  .search-table-filters {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 4px;
  }

  .search-table-filters-item {
    width: 100%;
  }

  .search-table-filters-action-btn-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .search-table-body {
    max-width: 100%;
  }
</style>

