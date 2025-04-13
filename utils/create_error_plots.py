import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# ------------------------------------------------------------------------------
# 1) DEFINE THE DATA
# ------------------------------------------------------------------------------
# Long-Term Forecasting RMSE data
rmse_data = { 'Building': ['1', '2', '3', '4', '5', '6'], 'CitySim': [ 120.2204062, 39.17783814, 207.2897587, 61.05025848, 60.48780526, 11.04038414 ], 'XGBoost': [ 20.65134066, 15.09582249, 28.1192527, 6.302061963, 9.985900559, 4.855153619 ] }
mbe_data = { 'Building': ['1', '2', '3', '4', '5', '6'], 'CitySim': [ 81.26198592, 21.36409062, 6.037628834, 42.05378423, -21.06949524, 2.424605723 ], 'XGBoost': [ 0.335162897, 1.139594068, -2.360057138, 0.473527035, 0.10007243, 0.819126199 ] }

# ------------------------------------------------------------------------------
# 2) CREATE DATAFRAMES
# ------------------------------------------------------------------------------
df_rmse = pd.DataFrame(rmse_data)
df_mbe = pd.DataFrame(mbe_data)

# OPTIONAL: Uncomment the following lines to add an 'Average' row if desired.
# avg_rmse_citysim = df_rmse['CitySim'].mean()
# avg_rmse_xgboost = df_rmse['XGBoost'].mean()
# df_rmse = df_rmse.append({
#     'Building': 'Average',
#     'CitySim': avg_rmse_citysim,
#     'XGBoost': avg_rmse_xgboost
# }, ignore_index=True)

# avg_mbe_citysim = df_mbe['CitySim'].mean()
# avg_mbe_xgboost = df_mbe['XGBoost'].mean()
# df_mbe = df_mbe.append({
#     'Building': 'Average',
#     'CitySim': avg_mbe_citysim,
#     'XGBoost': avg_mbe_xgboost
# }, ignore_index=True)

# ------------------------------------------------------------------------------
# 3) SET GLOBAL PLOTTING OPTIONS
# ------------------------------------------------------------------------------
sns.set(style="whitegrid")        # Seaborn style
plt.rcParams['figure.dpi'] = 300  # High-res figures
plt.rcParams['savefig.dpi'] = 300

# ------------------------------------------------------------------------------
# 4) FIGURE 1: BAR CHART FOR FORECASTING RMSE
# ------------------------------------------------------------------------------
def plot_rmse_bar_chart(df, filename='bar_chart_forecasting_rmse_comparison.png'):
    """
    Creates a bar chart comparing CitySim and XGBoost RMSE across buildings.
    """
    # Melt the DataFrame for Seaborn
    plot_df = df.melt(id_vars='Building', value_vars=['CitySim', 'XGBoost'],
                      var_name='Model', value_name='RMSE')
    
    plt.figure(figsize=(6, 4))
    sns.barplot(x='Building', y='RMSE', hue='Model', data=plot_df, palette='viridis')
    
    plt.title('Forecast RMSE of CitySim and XGBoost')
    plt.xlabel('Building')
    plt.ylabel('Root Mean Squared Error')
    plt.legend(title='Model', loc='upper right')

    # Annotate each bar with its RMSE value
    for patch in plt.gca().patches:
        height = patch.get_height()
        plt.text(patch.get_x() + patch.get_width()/2., height,
                 f'{height:.2f}', ha='center', va='bottom', fontsize=8)

    plt.tight_layout()
    plt.savefig(filename)
    plt.close()

# ------------------------------------------------------------------------------
# 5) FIGURE 2: BAR CHART FOR FORECASTING MBE
# ------------------------------------------------------------------------------
def plot_mbe_bar_chart(df, filename='bar_chart_forecasting_mbe_comparison.png'):
    """
    Creates a bar chart comparing CitySim and XGBoost MBE across buildings.
    """
    # Melt the DataFrame for Seaborn
    plot_df = df.melt(id_vars='Building', value_vars=['CitySim', 'XGBoost'],
                      var_name='Model', value_name='MBE')
    
    plt.figure(figsize=(6, 4))
    sns.barplot(x='Building', y='MBE', hue='Model', data=plot_df, palette='Set2')
    
    plt.title('Forecast MBE of CitySim and XGBoost')
    plt.xlabel('Building')
    plt.ylabel('Mean Bias Error')
    plt.legend(title='Model', loc='upper right')
    
    # Annotate each bar with its MBE value
    for patch in plt.gca().patches:
        height = patch.get_height()
        plt.text(patch.get_x() + patch.get_width()/2., height,
                 f'{height:.2f}', ha='center', va='bottom', fontsize=8)

    plt.tight_layout()
    plt.savefig(filename)
    plt.close()

# ------------------------------------------------------------------------------
# 6) RUN PLOTTING FUNCTIONS
# ------------------------------------------------------------------------------
plot_rmse_bar_chart(df_rmse)     # Saves bar_chart_forecasting_rmse_comparison.png
plot_mbe_bar_chart(df_mbe)       # Saves bar_chart_forecasting_mbe_comparison.png

print("Plots have been successfully generated:")
print("1) bar_chart_forecasting_rmse_comparison.png")
print("2) bar_chart_forecasting_mbe_comparison.png")
