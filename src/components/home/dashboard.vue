<template>
    <div class="dashboardView">
        <Card>
            <div>
                <Tabs value="name1">
                    <TabPane label="专项考核" name="name1">

                    </TabPane>
                    <TabPane label="三会一课" name="name2">
                        
                    </TabPane>
                </Tabs>
            </div>
        </Card>
    </div>
</template>

<style>
.dashboardView{
    width: 100%;
    height: 100%;
    background: #f0f2f5;
    box-sizing: border-box;
    position: relative;
    padding: 15px;
}
</style>

<script>
export default {
    name:'dash_borad',
    data(){
        return {

        }
    }
}
</script>
