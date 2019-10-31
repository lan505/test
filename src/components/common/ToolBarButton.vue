<template>
    <div>
        <Form ref="formInline" inline>
            <FormItem :key="menu.menuId" v-for="menu in this.filterAuthority">
                <Button :type="menu.color" :icon="menu.icon">{{menu.name}}</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    created() {},
    data() {
        return {};
    },
    props: {
        authority: {
            type: Array,
            default() {
                return [];
            }
        },
        own: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    methods: {},
    computed: {
        filterAuthority() {
            this.authority.filter(item => {
                console.log(this.own);
                console.log(item.url);
                return this.own.indexOf("/user/save") > -1;
            });
            
        }
    }
};
</script>

<style scoped>
</style>
